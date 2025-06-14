from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import *

class UserRegistrationForm(forms.Form):
    TYPE_CHOICES = [
        ('user', 'User'),
        ('admin', 'Company Admin'),
    ]

    type_job = forms.ChoiceField(
        choices=TYPE_CHOICES, widget=forms.RadioSelect(attrs={'name': 'type_job'}), initial='user')
    username = forms.CharField(label='Username', min_length=6, widget=forms.TextInput(
        attrs={'placeholder': 'Enter your full name', 'id': 'id_username'}))
    password = forms.CharField(label='Password', min_length=8, widget=forms.PasswordInput(
        attrs={'placeholder': 'Enter your password', 'id': 'id_password'}))
    confirm_password = forms.CharField(label='Confirm Password', widget=forms.PasswordInput(
        attrs={'placeholder': 'Confirm your password', 'id': 'id_confirm_password'}))
    email = forms.EmailField(label='Email', widget=forms.EmailInput(
        attrs={'placeholder': 'Enter your email address', 'id': 'id_email'}))
    company_name = forms.CharField(label='Company Name', required=False, widget=forms.TextInput(
        attrs={'placeholder': 'Enter your company name', 'id': 'id_company_name'}))

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        if password != confirm_password:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data


class LoginForm(forms.Form):
    username = forms.CharField(label='Username', max_length=100, widget=forms.TextInput(
        attrs={'placeholder': 'Enter your username', 'required': True}))
    password = forms.CharField(label='Password', max_length=100, widget=forms.PasswordInput(
        attrs={'placeholder': 'Enter your password', 'minlength': 8, 'required': True}))

class ExperienceForm(forms.ModelForm):
    class Meta:
        model = Experience
        fields = ['company', 'position', 'description', 'start_date', 'end_date', 'is_current']

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'description', 'technologies', 'url', 'github_url', 'start_date', 'end_date']

class LicenseForm(forms.ModelForm):
    class Meta:
        model = License
        fields = ['title', 'issuing_organization', 'issue_date', 'expiration_date', 'credential_id', 'credential_url']

class CertificateForm(forms.ModelForm):
    class Meta:
        model = Certificate
        fields = ['title', 'issuing_organization', 'issue_date', 'expiration_date', 'credential_id', 'credential_url']

class AwardForm(forms.ModelForm):
    class Meta:
        model = Award
        fields = ['name', 'description', 'issuing_organization', 'date_received', 'url']