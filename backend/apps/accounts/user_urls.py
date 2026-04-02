from django.urls import path
from . import views, admin_views

urlpatterns = [
    path('me/', views.MeView.as_view(), name='user-me'),
    path('', admin_views.UserListView.as_view(), name='user-list'),
    path('<int:pk>/', admin_views.UserDetailView.as_view(), name='user-detail'),
]
