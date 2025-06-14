from django.urls import path
from . import api_views

app_name = 'user_api'

urlpatterns = [
    # Authentication endpoints
    path('auth/register/', api_views.register, name='register'),
    path('auth/login/', api_views.login, name='login'),
    path('auth/logout/', api_views.logout, name='logout'),
    
    # User profile endpoints
    path('profile/', api_views.UserProfileView.as_view(), name='user-profile'),
    path('dashboard/', api_views.UserDashboardView.as_view(), name='user-dashboard'),
    
    # User profile components
    path('experiences/', api_views.ExperienceListCreateView.as_view(), name='experience-list-create'),
    path('experiences/<int:pk>/', api_views.ExperienceDetailView.as_view(), name='experience-detail'),
    path('projects/', api_views.ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/<int:pk>/', api_views.ProjectDetailView.as_view(), name='project-detail'),
    
    # API overview
    path('', api_views.api_overview, name='user-api-overview'),
]
