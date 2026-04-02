from rest_framework import serializers
from apps.accounts.serializers import UserPublicSerializer
from apps.announcements.serializers import BloodRequestSerializer
from .models import DonorMatch


class DonorMatchSerializer(serializers.ModelSerializer):
    donor = UserPublicSerializer(read_only=True)
    blood_request = BloodRequestSerializer(read_only=True)

    class Meta:
        model = DonorMatch
        fields = [
            'id', 'blood_request', 'donor', 'status',
            'notified_at', 'responded_at', 'created_at',
        ]
        read_only_fields = fields
