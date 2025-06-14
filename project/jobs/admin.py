from django.contrib import admin
from .models import Job, Application

# Register your models here.
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'company_name', 'location', 'salary', 'years_of_experience', 'posted_by']
    list_filter = ['years_of_experience', 'salary']
    search_fields = ['title', 'company_name', 'location', 'posted_by__user__username']
    ordering = ['-id']

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['job', 'full_name', 'email', 'education', 'experience', 'applied_by']
    list_filter = ['education', 'experience']
    search_fields = ['full_name', 'email', 'job__title', 'applied_by__user__username']
    ordering = ['-id']
