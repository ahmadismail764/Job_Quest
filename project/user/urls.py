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
    path('add_award.html/', views.add_award, name='add-award'),
    path('add_cert.html/', views.add_cert, name='add-cert'),
    path('add_exper.html/', views.add_exper, name='add-exper'),
    path('add_license.html/', views.add_license, name='add-license'),
    path('add_project.html/', views.add_project, name='add-project'),
    path('delete/<int:job_id>/', views.delete_job, name='delete-job'),
]
