from django.urls import path
from . import views


urlpatterns = [
    path('', views.job_list, name='job-list'),
    path('job/<int:job_id>/', views.job_detail, name='job-detail'),
    path('job/<int:job_id>/apply/', views.apply_for_job, name='apply-for-job'),
    path('post/', views.post_job, name='post-job'),
    path('contact/', views.contact, name='contact'),

]
