from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from apps.accounts.permissions import IsOwnerOrReadOnly
from .models import BloodRequest
from .serializers import BloodRequestSerializer, BloodRequestCreateSerializer


class BloodRequestListView(generics.ListCreateAPIView):
    queryset = BloodRequest.objects.select_related('user')
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['blood_type_needed', 'status', 'urgency']
    search_fields = ['title', 'location', 'hospital_name']
    ordering_fields = ['created_at', 'needed_date', 'urgency']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BloodRequestCreateSerializer
        return BloodRequestSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save(user=request.user)
        return Response(
            BloodRequestSerializer(instance).data,
            status=status.HTTP_201_CREATED,
        )


class BloodRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BloodRequest.objects.select_related('user')
    serializer_class = BloodRequestSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in ('PUT', 'PATCH'):
            return BloodRequestCreateSerializer
        return BloodRequestSerializer


class MyBloodRequestsView(generics.ListAPIView):
    serializer_class = BloodRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BloodRequest.objects.filter(user=self.request.user).select_related('user')


class BloodRequestStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            blood_request = BloodRequest.objects.get(pk=pk)
        except BloodRequest.DoesNotExist:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        if blood_request.user != request.user and request.user.role != 'admin':
            return Response({'error': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)

        new_status = request.data.get('status')
        if new_status not in dict(BloodRequest.Status.choices):
            return Response({'error': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

        blood_request.status = new_status
        blood_request.save(update_fields=['status', 'updated_at'])
        return Response(BloodRequestSerializer(blood_request).data)
