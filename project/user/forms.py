from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django import forms
from django.contrib.auth.models import User


class UserRegistrationForm(forms.Form):
    TYPE_CHOICES = [
        ('user', 'User'),
        ('admin', 'Company Admin'),
    ]

    type_job = forms.ChoiceField(
        choices=TYPE_CHOICES, widget=forms.RadioSelect)
    username = forms.CharField(label='Username', min_length=6, widget=forms.TextInput(
        attrs={'placeholder': 'Enter your full name'}))
    password = forms.CharField(label='Password', min_length=8, widget=forms.PasswordInput(
        attrs={'placeholder': 'Enter your password'}))
    confirm_password = forms.CharField(label='Confirm Password', widget=forms.PasswordInput(
        attrs={'placeholder': 'Confirm your password'}))
    email = forms.EmailField(label='Email', widget=forms.EmailInput(
        attrs={'placeholder': 'Enter your email address'}))
    company_name = forms.CharField(label='Company Name', required=False, widget=forms.TextInput(
        attrs={'placeholder': 'Enter your company name'}))

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        if password != confirm_password:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data
