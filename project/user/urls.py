from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('admindashboard/', views.admindashboard, name='admindashboard'),
    path('userdashboard/', views.userdashboard, name='userdashboard'),
    path('add_award/', add_award, name='add_award'),
    path('add_certificate/', views.add_certificate, name='add_certificate'),
]
