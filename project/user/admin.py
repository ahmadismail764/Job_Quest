from django.contrib import admin
from .models import UserAccount, Experience, Project, Education, License, Certificate, Skill, Interest, Award

# Register your models here.
@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ['user', 'type_job', 'company_name', 'email', 'phone_number', 'location']
    list_filter = ['type_job', 'created_at']
    search_fields = ['user__username', 'user__first_name', 'user__last_name', 'company_name', 'email']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'position', 'company', 'start_date', 'end_date', 'is_current']
    list_filter = ['is_current', 'start_date']
    search_fields = ['user_account__user__username', 'company', 'position']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'title', 'start_date', 'end_date']
    list_filter = ['start_date']
    search_fields = ['user_account__user__username', 'title', 'description']

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'degree_type', 'field_of_study', 'institution', 'start_year', 'end_year']
    list_filter = ['degree_type', 'end_year']
    search_fields = ['user_account__user__username', 'institution', 'field_of_study']

@admin.register(License)
class LicenseAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'title', 'issuing_organization', 'issue_date', 'expiration_date']
    list_filter = ['issue_date', 'expiration_date']
    search_fields = ['user_account__user__username', 'title', 'issuing_organization']

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'title', 'issuing_organization', 'issue_date', 'expiration_date']
    list_filter = ['issue_date', 'expiration_date']
    search_fields = ['user_account__user__username', 'title', 'issuing_organization']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'name', 'level', 'years_of_experience']
    list_filter = ['level', 'years_of_experience']
    search_fields = ['user_account__user__username', 'name']

@admin.register(Interest)
class InterestAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'title', 'since']
    list_filter = ['since']
    search_fields = ['user_account__user__username', 'title']

@admin.register(Award)
class AwardAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'name', 'issuing_organization', 'date_received']
    list_filter = ['date_received']
    search_fields = ['user_account__user__username', 'name', 'issuing_organization']
