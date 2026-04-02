from django.urls import path
from . import views

urlpatterns = [
    path('', views.CampaignListView.as_view(), name='campaign-list'),
    path('my/', views.MyCampaignsView.as_view(), name='campaign-my'),
    path('upcoming/', views.UpcomingCampaignsView.as_view(), name='campaign-upcoming'),
    path('<int:pk>/', views.CampaignDetailView.as_view(), name='campaign-detail'),
]
