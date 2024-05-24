from django import forms
from .models import Job, Application


class JobForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['title', 'company_name', 'description', 'location', 'requirements',
                  'salary', 'years_of_experience', 'company_url']


class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = ['full_name', 'email', 'phone', 'education',
                  'experience', 'linkedin', 'comments']
                  
class SearchForm(forms.Form):
    keyword= forms.CharField(max_length=100,required=True)
    experience=forms.IntegerField(max_value=60,min_value=0,required=True)