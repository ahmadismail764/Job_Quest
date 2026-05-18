from django.contrib import admin
from django.urls import path , include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app_core_users.urls')),
    path('jobs/', include('app_jobs.urls')),
]
