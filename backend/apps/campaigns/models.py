from django.db import models
from django.conf import settings


class Campaign(models.Model):
    class Status(models.TextChoices):
        UPCOMING = 'upcoming', 'Upcoming'
        ACTIVE = 'active', 'Active'
        COMPLETED = 'completed', 'Completed'
        CANCELLED = 'cancelled', 'Cancelled'

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='campaigns',
    )
    name = models.CharField(max_length=200)
    organizer_name = models.CharField(max_length=200)
    contact_number = models.CharField(max_length=20)
    campaign_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=300)
    city = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.UPCOMING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-campaign_date']
        indexes = [
            models.Index(fields=['status', 'campaign_date']),
            models.Index(fields=['city']),
        ]

    def __str__(self):
        return f"{self.name} - {self.campaign_date}"
