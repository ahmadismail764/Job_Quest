from django.contrib import admin
from .models import UserAccount, Exper, Project, Education, License, Cert, Skill, Interest, Award

# Register your models here.
@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ['user', 'type_job', 'company_name', 'email']
    list_filter = ['type_job']
    search_fields = ['user__username', 'company_name', 'email']

@admin.register(Exper)
class ExperAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'company', 'start', 'end']
    list_filter = ['start', 'end']
    search_fields = ['user_account__user__username', 'company']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'title', 'purpose', 'date']
    search_fields = ['user_account__user__username', 'title']

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'type', 'institute', 'start', 'end']
    list_filter = ['type']
    search_fields = ['user_account__user__username', 'institute']

@admin.register(License)
class LicenseAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'title', 'where', 'when']
    search_fields = ['user_account__user__username', 'title']

@admin.register(Cert)
class CertAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'title', 'where', 'start', 'end']
    search_fields = ['user_account__user__username', 'title']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'name', 'level']
    list_filter = ['level']
    search_fields = ['user_account__user__username', 'name']

@admin.register(Interest)
class InterestAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'title', 'since']
    search_fields = ['user_account__user__username', 'title']

@admin.register(Award)
class AwardAdmin(admin.ModelAdmin):
    list_display = ['user_account', 'name', 'purpose', 'provider', 'date']
    search_fields = ['user_account__user__username', 'name', 'provider']
