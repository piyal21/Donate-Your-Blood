from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Count
from apps.accounts.models import CustomUser
from apps.accounts.serializers import UserPublicSerializer


class DonorListView(generics.ListAPIView):
    serializer_class = UserPublicSerializer
    permission_classes = [AllowAny]
    filterset_fields = ['blood_group', 'city', 'is_available']
    search_fields = ['first_name', 'last_name', 'city']
    ordering_fields = ['first_name', 'city', 'blood_group']

    def get_queryset(self):
        return CustomUser.objects.filter(is_donor=True, is_active=True)


class DonorDetailView(generics.RetrieveAPIView):
    serializer_class = UserPublicSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return CustomUser.objects.filter(is_donor=True, is_active=True)


class ToggleAvailabilityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if not user.is_donor:
            return Response(
                {'error': 'Only donors can toggle availability.'},
                status=status.HTTP_403_FORBIDDEN,
            )
        user.is_available = not user.is_available
        user.save(update_fields=['is_available', 'updated_at'])
        return Response({
            'is_available': user.is_available,
            'message': f"You are now {'available' if user.is_available else 'unavailable'} for donation.",
        })


class DonorStatsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        stats = (
            CustomUser.objects
            .filter(is_donor=True, is_active=True)
            .values('blood_group')
            .annotate(
                total=Count('id'),
                available=Count('id', filter=Count('is_available')),
            )
            .order_by('blood_group')
        )
        total_donors = CustomUser.objects.filter(is_donor=True, is_active=True).count()
        total_available = CustomUser.objects.filter(is_donor=True, is_active=True, is_available=True).count()
        return Response({
            'total_donors': total_donors,
            'total_available': total_available,
            'by_blood_group': list(stats),
        })
