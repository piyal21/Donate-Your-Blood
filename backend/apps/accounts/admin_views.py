from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from .serializers import AdminUserSerializer, UserPublicSerializer
from .permissions import IsAdminUser


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all().order_by('-created_at')
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminUserSerializer
    filterset_fields = ['role', 'blood_group', 'is_donor', 'is_available', 'is_active']
    search_fields = ['email', 'username', 'first_name', 'last_name', 'city']


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminUserSerializer

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
