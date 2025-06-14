from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from user.models import UserAccount


class Company(models.Model):
    name = models.CharField(max_length=200, unique=True, default='Company Name')
    description = models.TextField(blank=True, default='')
    website = models.URLField(blank=True, default='')
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, default='')
    size = models.CharField(max_length=50, choices=[
        ('1-10', '1-10 employees'),
        ('11-50', '11-50 employees'),
        ('51-200', '51-200 employees'),
        ('201-500', '201-500 employees'),
        ('501-1000', '501-1000 employees'),
        ('1001-5000', '1001-5000 employees'),
        ('5000+', '5000+ employees'),
    ], blank=True, default='')
    location = models.CharField(max_length=200, blank=True, default='')
    founded = models.CharField(max_length=4, blank=True, default='')  # Year founded
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name_plural = "Companies"

    def __str__(self):
        return self.name


class Job(models.Model):
    JOB_TYPE_CHOICES = [
        ('full_time', 'Full-time'),
        ('part_time', 'Part-time'),
        ('contract', 'Contract'),
        ('freelance', 'Freelance'),
        ('internship', 'Internship'),
    ]
    
    EXPERIENCE_LEVEL_CHOICES = [
        ('entry', 'Entry Level'),
        ('mid', 'Mid Level'),
        ('senior', 'Senior Level'),
        ('executive', 'Executive'),
    ]

    title = models.CharField(max_length=200, default='Job Title')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='jobs', default=1)
    description = models.TextField(default='Job description')
    location = models.CharField(max_length=200, default='Location TBD')
    requirements = models.JSONField(default=list)  # Store as array
    salary_min = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True,
        validators=[MinValueValidator(0)]
    )
    salary_max = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True,
        validators=[MinValueValidator(0)]
    )
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES, default='full_time')
    experience_level = models.CharField(max_length=20, choices=EXPERIENCE_LEVEL_CHOICES, default='mid')
    years_of_experience = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(60)]
    )
    is_remote = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    tags = models.JSONField(default=list)  # Store as array
    application_deadline = models.DateTimeField(null=True, blank=True)
    posted_by = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, related_name='posted_jobs', default=1)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} at {self.company.name}"

    @property
    def salary_display(self):
        if self.salary_min and self.salary_max:
            return f"${self.salary_min:,.0f} - ${self.salary_max:,.0f}"
        elif self.salary_min:
            return f"${self.salary_min:,.0f}+"
        return "Salary not specified"


class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('under_review', 'Under Review'),
        ('interview_scheduled', 'Interview Scheduled'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='applications', default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    cover_letter = models.TextField(blank=True)
    resume = models.FileField(upload_to='resumes/%Y/%m/%d/', blank=True, null=True)
    applied_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)    # Keep old fields for backwards compatibility during migration
    full_name = models.CharField(max_length=100, blank=True, default='')
    email = models.EmailField(blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')
    education = models.CharField(max_length=20, blank=True, choices=[
        ('high_school', 'High School'), 
        ('bachelor', 'Bachelor'), 
        ('master', 'Master'), 
        ('doctorate', 'Doctorate')
    ])
    experience = models.IntegerField(null=True, blank=True, validators=[
        MinValueValidator(0), MaxValueValidator(60)    ])
    linkedin = models.URLField(blank=True, default='')
    comments = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-applied_at']

    def __str__(self):
        if self.applicant:
            return f"{self.applicant.user.username} applied for {self.job.title}"
        else:
            return f"{self.full_name} applied for {self.job.title}"


class SavedJob(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='saved_jobs')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='saved_by')
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'job')

    def __str__(self):
        return f"{self.user.user.username} saved {self.job.title}"
