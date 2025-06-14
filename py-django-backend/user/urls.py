from django.urls import path
from . import views
from .views import *
from jobs.views import *

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('admindashboard/', views.admindashboard, name='admindashboard'),
    path('userdashboard/', views.userdashboard, name='userdashboard'),
    path('add_award/', views.add_award, name='add_award'),
    path('add_cert/', views.add_cert, name='add_cert'),
    path('add_exper/', views.add_exper, name='add_exper'),
    path('add_license/', views.add_license, name='add_license'),
    path('add_project/', views.add_project, name='add_project'),
    path('delete/<int:job_id>/', views.delete_job, name='delete-job'),
]
