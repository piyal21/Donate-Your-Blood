from django.utils import timezone
from apps.accounts.models import CustomUser
from apps.announcements.models import BloodRequest
from apps.matching.models import DonorMatch
from apps.notifications.services import send_notification_email

# Who can donate to whom (donor blood type -> recipient blood types)
BLOOD_COMPATIBILITY = {
    'O-':  ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    'O+':  ['O+', 'A+', 'B+', 'AB+'],
    'A-':  ['A-', 'A+', 'AB-', 'AB+'],
    'A+':  ['A+', 'AB+'],
    'B-':  ['B-', 'B+', 'AB-', 'AB+'],
    'B+':  ['B+', 'AB+'],
    'AB-': ['AB-', 'AB+'],
    'AB+': ['AB+'],
}


def get_compatible_donor_types(needed_type):
    """Find which blood types can donate to the needed type."""
    return [
        bt for bt, recipients in BLOOD_COMPATIBILITY.items()
        if needed_type in recipients
    ]


def find_matching_donors(blood_request: BloodRequest) -> list[DonorMatch]:
    """
    3-tier matching:
    1. Exact blood type + same city + available
    2. Exact blood type + any city + available
    3. Compatible blood types + available
    """
    needed_type = blood_request.blood_type_needed
    owner = blood_request.user

    already_matched = set(
        DonorMatch.objects.filter(blood_request=blood_request)
        .values_list('donor_id', flat=True)
    )
    exclude_ids = already_matched | {owner.id}

    base_qs = CustomUser.objects.filter(
        is_donor=True, is_available=True, is_active=True,
    ).exclude(id__in=exclude_ids)

    # Tier 1: Exact type, same city
    tier1 = list(base_qs.filter(
        blood_group=needed_type,
        city__iexact=blood_request.location,
    ))
    tier1_ids = {d.id for d in tier1}

    # Tier 2: Exact type, any city
    tier2 = list(base_qs.filter(
        blood_group=needed_type,
    ).exclude(id__in=tier1_ids))
    tier2_ids = {d.id for d in tier2}

    # Tier 3: Compatible types
    compatible_types = get_compatible_donor_types(needed_type)
    tier3 = list(base_qs.filter(
        blood_group__in=compatible_types,
    ).exclude(blood_group=needed_type).exclude(id__in=tier1_ids | tier2_ids))

    matches_created = []
    now = timezone.now()

    for donor in tier1 + tier2 + tier3:
        match = DonorMatch.objects.create(
            blood_request=blood_request,
            donor=donor,
            status=DonorMatch.MatchStatus.NOTIFIED,
            notified_at=now,
        )
        matches_created.append(match)

        send_notification_email(
            recipient_user=donor,
            email_type='blood_request_match',
            subject=f'Blood Donation Request: {needed_type} needed',
            template_name='blood_request_match.html',
            context={
                'donor': donor,
                'blood_request': blood_request,
                'match': match,
            },
        )

    if matches_created:
        blood_request.status = BloodRequest.Status.MATCHED
        blood_request.save(update_fields=['status', 'updated_at'])

    return matches_created
