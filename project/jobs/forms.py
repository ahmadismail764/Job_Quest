from django import forms
from user.models import Job, Application

<<<<<<< HEAD

class ApplicationForm(forms.Form):
    full_name = forms.CharField(max_length=100)
    email = forms.EmailField()
    phone = forms.CharField(max_length=20)
    education = forms.ChoiceField(choices=(('high_school', 'High School'), (
        'bachelor', 'Bachelor'), ('master', 'Master'), ('doctorate', 'Doctorate')))
    experience = forms.IntegerField()
    # resume = forms.FileField(upload_to='resumes/%Y/%m/%d/')
    # cover_letter = forms.FileField(upload_to='cover_letters/%Y/%m/%d/')
    linkedin = forms.URLField()
    comments = forms.CharField(widget=forms.Textarea)
    # applied_by = forms.CharField(max_length=100)
    # created_at = forms.DateTimeField(auto_now_add=True)
=======
# class JobForm(forms.ModelForm):
#     class Meta:
#         model = Job
#         fields = ['title', 'description']

class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = ['full_name', 'email', 'phone', 'education', 'experience', 'linkedin', 'comments']
>>>>>>> 044f8954cd38dc0ffd19569d4db0f3996e0d75cc
