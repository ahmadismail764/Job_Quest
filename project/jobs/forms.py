from django import forms
from .models import Job, Application

# class JobForm(forms.ModelForm):
#     class Meta:
#         model = Job
#         fields = ['title', 'description']

class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = ['full_name', 'email', 'phone', 'education', 'experience', 'linkedin', 'comments']