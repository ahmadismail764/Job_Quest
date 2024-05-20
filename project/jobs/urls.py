from django.urls import path
from . import views


urlpatterns = [
    path('job/application', views.application, name='application'),
]