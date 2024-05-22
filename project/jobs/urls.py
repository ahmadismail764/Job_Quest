from django.urls import path
from . import views


urlpatterns = [
<<<<<<< HEAD
    path('job/application', views.application, name='application'),
    path('job', views.displayJob, name='job'),
    path('', views.listJobs, name='jobs'),
    path('<int:id>', views.getJob, name='job_details'),
]
=======
    path('', views.listJobs, name='job_list'),
    path('job/<int:job_id>/', views.job_detail, name='job_detail'),
    path('job/<int:job_id>/apply/', views.apply_for_job, name='apply_for_job'),
    # path('post_job/', views.post_job, name='post_job'),
]
>>>>>>> 044f8954cd38dc0ffd19569d4db0f3996e0d75cc
