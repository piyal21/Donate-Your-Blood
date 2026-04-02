from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from apps.announcements.models import BloodRequest
from apps.announcements.serializers import BloodRequestSerializer
from apps.notifications.services import send_notification_email
from .models import DonorMatch
from .serializers import DonorMatchSerializer
from .services import find_matching_donors


class MyMatchesView(generics.ListAPIView):
    """List matches where current user is the donor."""
    serializer_class = DonorMatchSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            DonorMatch.objects
            .filter(donor=self.request.user)
            .select_related('blood_request__user', 'donor')
            .order_by('-created_at')
        )


class MatchDetailView(generics.RetrieveAPIView):
    serializer_class = DonorMatchSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DonorMatch.objects.filter(donor=self.request.user)


class AcceptMatchView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            match = DonorMatch.objects.select_related('blood_request__user', 'donor').get(
                pk=pk, donor=request.user,
            )
        except DonorMatch.DoesNotExist:
            return Response({'error': 'Match not found.'}, status=status.HTTP_404_NOT_FOUND)

        match.status = DonorMatch.MatchStatus.ACCEPTED
        match.responded_at = timezone.now()
        match.save(update_fields=['status', 'responded_at'])

        # Notify the blood request owner
        send_notification_email(
            recipient_user=match.blood_request.user,
            email_type='match_accepted',
            subject=f'Donor found for your blood request: {match.blood_request.title}',
            template_name='match_accepted.html',
            context={
                'donor': match.donor,
                'blood_request': match.blood_request,
            },
        )

        return Response(DonorMatchSerializer(match).data)


class DeclineMatchView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            match = DonorMatch.objects.get(pk=pk, donor=request.user)
        except DonorMatch.DoesNotExist:
            return Response({'error': 'Match not found.'}, status=status.HTTP_404_NOT_FOUND)

        match.status = DonorMatch.MatchStatus.DECLINED
        match.responded_at = timezone.now()
        match.save(update_fields=['status', 'responded_at'])

        return Response(DonorMatchSerializer(match).data)


class FindDonorsView(APIView):
    """Trigger matching for a blood request (owner only)."""
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            blood_request = BloodRequest.objects.get(pk=pk, user=request.user)
        except BloodRequest.DoesNotExist:
            return Response({'error': 'Blood request not found.'}, status=status.HTTP_404_NOT_FOUND)

        matches = find_matching_donors(blood_request)
        return Response({
            'message': f'{len(matches)} donor(s) found and notified.',
            'matches': DonorMatchSerializer(matches, many=True).data,
        })


class MatchesByRequestView(generics.ListAPIView):
    """List all matches for a blood request (owner only)."""
    serializer_class = DonorMatchSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            DonorMatch.objects
            .filter(
                blood_request_id=self.kwargs['request_id'],
                blood_request__user=self.request.user,
            )
            .select_related('blood_request__user', 'donor')
        )
