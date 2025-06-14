# services.py
from .repositories import JobRepository, ApplicationRepository

def process_job(data):
    return JobRepository.create_job(data)

def process_application(data):
    return ApplicationRepository.create_application(data)
