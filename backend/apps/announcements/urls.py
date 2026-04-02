from django.urls import path
from . import views

urlpatterns = [
    path('', views.BloodRequestListView.as_view(), name='blood-request-list'),
    path('my/', views.MyBloodRequestsView.as_view(), name='blood-request-my'),
    path('<int:pk>/', views.BloodRequestDetailView.as_view(), name='blood-request-detail'),
    path('<int:pk>/status/', views.BloodRequestStatusView.as_view(), name='blood-request-status'),
]
