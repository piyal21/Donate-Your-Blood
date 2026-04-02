from django.urls import path
from . import views

urlpatterns = [
    path('', views.DonorListView.as_view(), name='donor-list'),
    path('stats/', views.DonorStatsView.as_view(), name='donor-stats'),
    path('toggle-availability/', views.ToggleAvailabilityView.as_view(), name='donor-toggle'),
    path('<int:pk>/', views.DonorDetailView.as_view(), name='donor-detail'),
]
