from django.db import models
from django.conf import settings


class DonorMatch(models.Model):
    class MatchStatus(models.TextChoices):
        PENDING = 'pending', 'Pending'
        NOTIFIED = 'notified', 'Notified'
        ACCEPTED = 'accepted', 'Accepted'
        DECLINED = 'declined', 'Declined'
        EXPIRED = 'expired', 'Expired'

    blood_request = models.ForeignKey(
        'announcements.BloodRequest',
        on_delete=models.CASCADE,
        related_name='matches',
    )
    donor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='match_requests',
    )
    status = models.CharField(max_length=10, choices=MatchStatus.choices, default=MatchStatus.PENDING)
    notified_at = models.DateTimeField(null=True, blank=True)
    responded_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['blood_request', 'donor']
        indexes = [
            models.Index(fields=['donor', 'status']),
            models.Index(fields=['blood_request', 'status']),
        ]

    def __str__(self):
        return f"Match: {self.donor} -> {self.blood_request} ({self.status})"
