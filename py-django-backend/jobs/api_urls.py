from django.urls import path
from . import api_views

app_name = 'jobs_api'

urlpatterns = [
    # API Root
    path('', api_views.api_root, name='api-root'),
    
    # Job endpoints
    path('jobs/', api_views.JobListCreateView.as_view(), name='job-list-create'),
    path('jobs/<int:pk>/', api_views.JobDetailView.as_view(), name='job-detail'),
    path('jobs/stats/', api_views.job_stats, name='job-stats'),
    
    # Company endpoints
    path('companies/', api_views.CompanyListView.as_view(), name='company-list'),
    path('companies/<int:pk>/', api_views.CompanyDetailView.as_view(), name='company-detail'),
    path('companies/<int:pk>/jobs/', api_views.company_jobs, name='company-jobs'),
    
    # Application endpoints
    path('applications/', api_views.ApplicationListCreateView.as_view(), name='application-list-create'),
]
