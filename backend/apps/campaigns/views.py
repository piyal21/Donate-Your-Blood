from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.utils import timezone
from apps.accounts.permissions import IsOwnerOrReadOnly
from .models import Campaign
from .serializers import CampaignSerializer, CampaignCreateSerializer


class CampaignListView(generics.ListCreateAPIView):
    queryset = Campaign.objects.select_related('user')
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['status', 'city']
    search_fields = ['name', 'organizer_name', 'location', 'city']
    ordering_fields = ['campaign_date', 'created_at']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CampaignCreateSerializer
        return CampaignSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save(user=request.user)
        return Response(
            CampaignSerializer(instance).data,
            status=status.HTTP_201_CREATED,
        )


class CampaignDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Campaign.objects.select_related('user')
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in ('PUT', 'PATCH'):
            return CampaignCreateSerializer
        return CampaignSerializer


class MyCampaignsView(generics.ListAPIView):
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Campaign.objects.filter(user=self.request.user).select_related('user')


class UpcomingCampaignsView(generics.ListAPIView):
    serializer_class = CampaignSerializer

    def get_queryset(self):
        return (
            Campaign.objects
            .filter(campaign_date__gte=timezone.now().date(), status=Campaign.Status.UPCOMING)
            .select_related('user')
        )
