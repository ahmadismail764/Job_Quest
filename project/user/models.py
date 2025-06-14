from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone


class UserAccount(models.Model):
    USER_TYPE_CHOICES = [
        ('job_seeker', 'Job Seeker'),
        ('employer', 'Employer'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    type_job = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='job_seeker')
    company_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(default='default@default.com')
    phone_number = models.CharField(max_length=20, blank=True, default='')
    location = models.CharField(max_length=200, blank=True)
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    experience_years = models.IntegerField(
        null=True, blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(60)]
    )
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        if self.user:
            return self.user.username
        else:
            return f"UserAccount {self.id}"

    @property
    def full_name(self):
        if self.user:
            return f"{self.user.first_name} {self.user.last_name}".strip()
        else:
            return "Anonymous User"


class Experience(models.Model):  # Renamed from Exper for clarity
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='experiences')
    company = models.CharField(max_length=200, default='Company Name')
    position = models.CharField(max_length=200, default='Position Title')
    description = models.TextField(blank=True)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(null=True, blank=True)  # Null means current job
    is_current = models.BooleanField(default=False)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.position} at {self.company}"


class Project(models.Model):
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=200, default='Project Title')
    description = models.TextField(default='Project description')
    technologies = models.JSONField(default=list)  # Array of tech used
    url = models.URLField(blank=True, default='')
    github_url = models.URLField(blank=True, default='')
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return self.title


class Education(models.Model):
    EDUCATION_TYPE_CHOICES = [
        ('high_school', 'High School'),
        ('associate', 'Associate Degree'),
        ('bachelor', 'Bachelor\'s Degree'),
        ('master', 'Master\'s Degree'),
        ('doctorate', 'Doctorate'),
        ('certificate', 'Certificate'),
        ('bootcamp', 'Bootcamp'),
    ]

    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='education')
    degree_type = models.CharField(max_length=20, choices=EDUCATION_TYPE_CHOICES, default='bachelor')
    field_of_study = models.CharField(max_length=200, blank=True)
    institution = models.CharField(max_length=200, default='Institution Name')
    start_year = models.CharField(max_length=4, default='2020')
    end_year = models.CharField(max_length=4, blank=True)
    gpa = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['-end_year']

    def __str__(self):
        return f"{self.degree_type} at {self.institution}"


class License(models.Model):
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='licenses')
    title = models.CharField(max_length=200, default='License Title')
    issuing_organization = models.CharField(max_length=200, default='Issuing Organization')
    issue_date = models.DateField(default=timezone.now)
    expiration_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=100, blank=True, default='')
    credential_url = models.URLField(blank=True, default='')

    def __str__(self):
        return f"{self.title} from {self.issuing_organization}"


class Certificate(models.Model):  # Renamed from Cert for clarity
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='certificates')
    title = models.CharField(max_length=200, default='Certificate Title')
    issuing_organization = models.CharField(max_length=200, default='Issuing Organization')
    issue_date = models.DateField(default=timezone.now)
    expiration_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=100, blank=True, default='')
    credential_url = models.URLField(blank=True, default='')

    def __str__(self):
        return f"{self.title} from {self.issuing_organization}"


class Skill(models.Model):
    SKILL_LEVEL_CHOICES = [
        (1, 'Beginner'),
        (2, 'Novice'),
        (3, 'Intermediate'),
        (4, 'Advanced'),
        (5, 'Expert'),
    ]

    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100, db_index=True, default='Skill Name')
    level = models.PositiveSmallIntegerField(
        choices=SKILL_LEVEL_CHOICES,
        default=3,
        validators=[MaxValueValidator(5), MinValueValidator(1)]
    )
    years_of_experience = models.PositiveSmallIntegerField(
        default=0,
        validators=[MaxValueValidator(50)]
    )

    class Meta:
        unique_together = ('user_account', 'name')
        ordering = ['-level', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_level_display()})"


class Interest(models.Model):
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='interests')
    title = models.CharField(max_length=100, db_index=True, default='Interest Title')
    since = models.DateField(default=timezone.now, null=True)

    class Meta:
        unique_together = ('user_account', 'title')

    def __str__(self):
        return self.title


class Award(models.Model):
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='awards', db_index=True)
    name = models.CharField(max_length=200, db_index=True, default='Award Name')
    description = models.TextField(blank=True)
    issuing_organization = models.CharField(max_length=200, db_index=True, default='Issuing Organization')
    date_received = models.DateField(default=timezone.now, db_index=True)
    url = models.URLField(blank=True)

    class Meta:
        ordering = ['-date_received']

    def __str__(self):
        return f"{self.name} from {self.issuing_organization}"
