from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('apps.accounts.urls')),
    path('api/v1/users/', include('apps.accounts.user_urls')),
    path('api/v1/donors/', include('apps.donors.urls')),
    path('api/v1/blood-requests/', include('apps.announcements.urls')),
    path('api/v1/campaigns/', include('apps.campaigns.urls')),
    path('api/v1/matches/', include('apps.matching.urls')),
]
