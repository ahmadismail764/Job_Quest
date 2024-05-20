from django import forms
from .models import Application

class ApplicationForm(forms.Form):
    full_name = forms.CharField(max_length=100)
    email = forms.EmailField()
    phone = forms.CharField(max_length=20)
    education = forms.ChoiceField(choices=(('high_school', 'High School'), ('bachelor', 'Bachelor'), ('master', 'Master'), ('doctorate', 'Doctorate')))
    experience = forms.IntegerField()
    # resume = forms.FileField(upload_to='resumes/%Y/%m/%d/')
    # cover_letter = forms.FileField(upload_to='cover_letters/%Y/%m/%d/')
    linkedin = forms.URLField()
    comments = forms.CharField(widget=forms.Textarea)
    # applied_by = forms.CharField(max_length=100)
    # created_at = forms.DateTimeField(auto_now_add=True)