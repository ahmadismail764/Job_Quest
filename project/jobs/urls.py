from django.urls import path
from . import views


urlpatterns = [
    path('', views.listJobs, name='job_list'),
    path('job/<int:job_id>/', views.job_detail, name='job_detail'),
    path('job/<int:job_id>/apply/', views.apply_for_job, name='apply_for_job'),
    path('post/', views.post_job, name='post_job'),
    path('contact/', views.contact, name='contact'),
]
