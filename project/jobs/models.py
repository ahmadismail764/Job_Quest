from django.db import models
from datetime import datetime
# Create your models here.


class Job(models.Model):
    class Meta:
        verbose_name_plural = 'PostedJobs'
    title = models.CharField(max_length=100, null=False, blank=False)
    company = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    location = models.CharField(max_length=100, null=False, blank=False)
    requirements = models.TextField(null=False, blank=False)
    salary = models.DecimalField(
        max_digits=10, decimal_places=2, null=False, blank=False)
    years_of_experience = models.IntegerField(null=False, blank=False)
    company_link = models.URLField(null=True, blank=True)
    # posted_by = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    # applied_by = models.ManyToManyField('auth.User', related_name='applied_by')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Application(models.Model):
    full_name = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(null=False, blank=False)
    phone = models.CharField(max_length=20, null=False, blank=False)
    education = models.CharField(max_length=20, null=False, blank=False, choices=(
        ('high_school', 'High School'), ('bachelor', 'Bachelor'), ('master', 'Master'), ('doctorate', 'Doctorate')))
    experience = models.IntegerField(null=False, blank=False)
    # resume = models.FileField(upload_to='resumes/%Y/%m/%d/', null=False, blank=False)
    # cover_letter = models.FileField(upload_to='cover_letters/%Y/%m/%d/', null=False, blank=False)
    linkedin = models.URLField(null=True, blank=True)
    comments = models.TextField(null=True, blank=True)
    # applied_by = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    # job = models.OneToOneField(Job, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name
