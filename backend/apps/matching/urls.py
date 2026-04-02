from django.urls import path
from . import views

urlpatterns = [
    path('', views.MyMatchesView.as_view(), name='match-list'),
    path('<int:pk>/', views.MatchDetailView.as_view(), name='match-detail'),
    path('<int:pk>/accept/', views.AcceptMatchView.as_view(), name='match-accept'),
    path('<int:pk>/decline/', views.DeclineMatchView.as_view(), name='match-decline'),
    path('by-request/<int:request_id>/', views.MatchesByRequestView.as_view(), name='match-by-request'),
    path('find-donors/<int:pk>/', views.FindDonorsView.as_view(), name='find-donors'),
]
