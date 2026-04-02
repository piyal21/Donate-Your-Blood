import logging
from django.core.mail import send_mail
from django.template.loader import render_to_string
from .models import EmailLog

logger = logging.getLogger(__name__)


def send_notification_email(recipient_user, email_type, subject, template_name, context):
    try:
        html_message = render_to_string(f'emails/{template_name}', context)
        send_mail(
            subject=subject,
            message='',
            from_email=None,  # uses DEFAULT_FROM_EMAIL
            recipient_list=[recipient_user.email],
            html_message=html_message,
        )
        EmailLog.objects.create(
            recipient=recipient_user,
            email_type=email_type,
            subject=subject,
            success=True,
        )
    except Exception as e:
        logger.error(f"Failed to send {email_type} email to {recipient_user.email}: {e}")
        EmailLog.objects.create(
            recipient=recipient_user,
            email_type=email_type,
            subject=subject,
            success=False,
            error_message=str(e),
        )
