from django.contrib import admin
from .models import EmailLog


@admin.register(EmailLog)
class EmailLogAdmin(admin.ModelAdmin):
    list_display = ['recipient', 'email_type', 'subject', 'sent_at', 'success']
    list_filter = ['email_type', 'success']
    search_fields = ['recipient__email', 'subject']
    readonly_fields = ['recipient', 'email_type', 'subject', 'sent_at', 'success', 'error_message']
