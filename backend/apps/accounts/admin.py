from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ['email', 'username', 'first_name', 'last_name', 'role', 'blood_group', 'is_donor', 'is_available', 'is_active']
    list_filter = ['role', 'blood_group', 'is_donor', 'is_available', 'is_active', 'gender']
    search_fields = ['email', 'username', 'first_name', 'last_name', 'city']
    ordering = ['-date_joined']

    fieldsets = UserAdmin.fieldsets + (
        ('Profile', {
            'fields': ('role', 'gender', 'date_of_birth', 'blood_group', 'address', 'city', 'contact_number', 'is_donor', 'is_available'),
        }),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Profile', {
            'fields': ('email', 'first_name', 'last_name', 'role', 'blood_group'),
        }),
    )
