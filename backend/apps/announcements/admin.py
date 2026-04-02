from django.contrib import admin
from .models import BloodRequest


@admin.register(BloodRequest)
class BloodRequestAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'blood_type_needed', 'status', 'urgency', 'needed_date', 'created_at']
    list_filter = ['status', 'urgency', 'blood_type_needed']
    search_fields = ['title', 'location', 'hospital_name']
    date_hierarchy = 'created_at'
    raw_id_fields = ['user']
