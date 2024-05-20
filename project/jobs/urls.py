from django.urls import path
from . import views


urlpatterns = [
    path('job/application', views.application, name='application'),
    path('job', views.displayJob, name='job'),
    path('', views.listJobs, name='jobs'),
]