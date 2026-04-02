from django.contrib import admin
from .models import DonorMatch


@admin.register(DonorMatch)
class DonorMatchAdmin(admin.ModelAdmin):
    list_display = ['blood_request', 'donor', 'status', 'notified_at', 'responded_at', 'created_at']
    list_filter = ['status']
    raw_id_fields = ['blood_request', 'donor']
