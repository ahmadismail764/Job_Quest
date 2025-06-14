from django import forms
from .models import Job, Application, Company


class JobForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['title', 'company', 'description', 'location', 'requirements',
                  'salary_min', 'salary_max', 'job_type', 'experience_level', 
                  'years_of_experience', 'is_remote', 'tags', 'application_deadline']


class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = ['cover_letter', 'resume']


class CompanyForm(forms.ModelForm):
    class Meta:
        model = Company
        fields = ['name', 'description', 'website', 'logo', 'industry', 
                  'size', 'location', 'founded']
                  

class SearchForm(forms.Form):
    keyword = forms.CharField(max_length=100, required=False)
    experience = forms.IntegerField(max_value=60, min_value=0, required=False)