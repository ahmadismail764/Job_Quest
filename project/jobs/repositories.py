# repositories.py
from .models import Job, Application

class JobRepository:
    @staticmethod
    def create_job(data):
        return Job.objects.create(**data)

    @staticmethod
    def get_job_by_id(job_id):
        return Job.objects.get(id=job_id)

class ApplicationRepository:
    @staticmethod
    def create_application(data):
        return Application.objects.create(**data)

    @staticmethod
    def get_application_by_id(app_id):
        return Application.objects.get(id=app_id)
