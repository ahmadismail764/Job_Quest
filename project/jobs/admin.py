from django.contrib import admin
from .models import Company, Job, Application, SavedJob

# Register your models here.
@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'industry', 'size', 'location', 'rating', 'created_at']
    list_filter = ['industry', 'size', 'rating', 'created_at']
    search_fields = ['name', 'description', 'industry', 'location']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'location', 'job_type', 'experience_level', 'is_remote', 'is_active', 'posted_by', 'created_at']
    list_filter = ['job_type', 'experience_level', 'is_remote', 'is_active', 'created_at']
    search_fields = ['title', 'company__name', 'location', 'description', 'posted_by__user__username']
    readonly_fields = ['created_at', 'updated_at', 'salary_display']
    ordering = ['-created_at']

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['applicant', 'job', 'status', 'applied_at']
    list_filter = ['status', 'applied_at']
    search_fields = ['applicant__user__username', 'applicant__user__first_name', 'applicant__user__last_name', 'job__title', 'job__company__name']
    readonly_fields = ['applied_at', 'updated_at']
    ordering = ['-applied_at']

@admin.register(SavedJob)
class SavedJobAdmin(admin.ModelAdmin):
    list_display = ['user', 'job', 'saved_at']
    list_filter = ['saved_at']
    search_fields = ['user__user__username', 'job__title', 'job__company__name']
    readonly_fields = ['saved_at']
    ordering = ['-saved_at']
