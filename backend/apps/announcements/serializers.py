from rest_framework import serializers
from apps.accounts.serializers import UserPublicSerializer
from .models import BloodRequest


class BloodRequestSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)

    class Meta:
        model = BloodRequest
        fields = [
            'id', 'user', 'title', 'blood_type_needed', 'units_needed',
            'urgency', 'status', 'hospital_name', 'location',
            'needed_date', 'details', 'contact_number',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'user', 'status', 'created_at', 'updated_at']


class BloodRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodRequest
        fields = [
            'title', 'blood_type_needed', 'units_needed', 'urgency',
            'hospital_name', 'location', 'needed_date', 'details',
            'contact_number',
        ]
