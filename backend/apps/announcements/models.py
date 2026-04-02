from django.db import models
from django.conf import settings


class BloodRequest(models.Model):
    class Status(models.TextChoices):
        OPEN = 'open', 'Open'
        MATCHED = 'matched', 'Matched'
        FULFILLED = 'fulfilled', 'Fulfilled'
        EXPIRED = 'expired', 'Expired'
        CANCELLED = 'cancelled', 'Cancelled'

    class Urgency(models.TextChoices):
        NORMAL = 'normal', 'Normal'
        URGENT = 'urgent', 'Urgent'
        CRITICAL = 'critical', 'Critical'

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='blood_requests',
    )
    title = models.CharField(max_length=200)
    blood_type_needed = models.CharField(max_length=5)
    units_needed = models.PositiveSmallIntegerField(default=1)
    urgency = models.CharField(max_length=10, choices=Urgency.choices, default=Urgency.NORMAL)
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.OPEN)
    hospital_name = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=200, blank=True)
    needed_date = models.DateField()
    details = models.TextField(blank=True)
    contact_number = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['blood_type_needed', 'status']),
            models.Index(fields=['needed_date']),
            models.Index(fields=['status', 'needed_date']),
        ]

    def __str__(self):
        return f"{self.title} - {self.blood_type_needed} ({self.status})"
