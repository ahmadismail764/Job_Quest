from django import forms
from .models import Job, Application


class JobForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = [
            'title', 'company', 'description', 'location', 'requirements',
            'salary', 'years_of_experience', 'company_link', 'applied_users', 'posted_user'
        ]


class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = ['full_name', 'email', 'phone', 'education',
                  'experience', 'linkedin', 'comments']
