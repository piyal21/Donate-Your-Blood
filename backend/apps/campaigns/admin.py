from django.contrib import admin
from .models import Campaign


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ['name', 'organizer_name', 'campaign_date', 'city', 'status', 'created_at']
    list_filter = ['status', 'city']
    search_fields = ['name', 'organizer_name', 'location', 'city']
    date_hierarchy = 'campaign_date'
    raw_id_fields = ['user']
