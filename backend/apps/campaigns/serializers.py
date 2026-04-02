from rest_framework import serializers
from apps.accounts.serializers import UserPublicSerializer
from .models import Campaign


class CampaignSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)

    class Meta:
        model = Campaign
        fields = [
            'id', 'user', 'name', 'organizer_name', 'contact_number',
            'campaign_date', 'end_date', 'location', 'city',
            'description', 'status', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'user', 'status', 'created_at', 'updated_at']


class CampaignCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = [
            'name', 'organizer_name', 'contact_number',
            'campaign_date', 'end_date', 'location', 'city', 'description',
        ]
