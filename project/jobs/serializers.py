from rest_framework import serializers
from .models import Job, Company, Application
from user.models import UserAccount


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = [
            'id', 'name', 'description', 'website', 'logo', 'industry', 
            'size', 'location', 'founded', 'rating', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class JobSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company', 'company_id', 'description', 'location', 
            'requirements', 'salary_min', 'salary_max', 'job_type', 'experience_level',
            'years_of_experience', 'is_remote', 'is_active', 'tags', 
            'application_deadline', 'created_at', 'updated_at', 'salary_display'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'salary_display']


class JobListSerializer(serializers.ModelSerializer):
    """Simplified serializer for job listings"""
    company_name = serializers.CharField(source='company.name', read_only=True)
    company_logo = serializers.ImageField(source='company.logo', read_only=True)
    
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company_name', 'company_logo', 'location', 
            'job_type', 'experience_level', 'is_remote', 'salary_min', 
            'salary_max', 'created_at', 'salary_display'
        ]


class ApplicationSerializer(serializers.ModelSerializer):
    job = JobListSerializer(read_only=True)
    job_id = serializers.IntegerField(write_only=True)
    applicant_name = serializers.CharField(source='applicant.full_name', read_only=True)
    
    class Meta:
        model = Application
        fields = [
            'id', 'job', 'job_id', 'applicant_name', 'status', 'cover_letter', 
            'resume', 'applied_at', 'updated_at'
        ]
        read_only_fields = ['id', 'applied_at', 'updated_at', 'applicant_name']
