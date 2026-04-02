from django.db import models
from django.conf import settings


class EmailLog(models.Model):
    class EmailType(models.TextChoices):
        WELCOME = 'welcome', 'Welcome'
        BLOOD_REQUEST_MATCH = 'blood_request_match', 'Blood Request Match'
        MATCH_ACCEPTED = 'match_accepted', 'Match Accepted'
        MATCH_DECLINED = 'match_declined', 'Match Declined'
        CAMPAIGN_UPDATE = 'campaign_update', 'Campaign Update'
        PASSWORD_RESET = 'password_reset', 'Password Reset'

    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='email_logs',
    )
    email_type = models.CharField(max_length=30, choices=EmailType.choices)
    subject = models.CharField(max_length=300)
    sent_at = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField(default=True)
    error_message = models.TextField(blank=True)

    class Meta:
        ordering = ['-sent_at']

    def __str__(self):
        return f"{self.email_type} to {self.recipient} ({self.sent_at})"
