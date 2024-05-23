from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone


class UserAccount(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    type_job = models.CharField(max_length=50, default='user')
    company_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(default='default@default.com')

    def __str__(self):
        return self.user.username


class Exper(models.Model):
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    company = models.CharField(max_length=100)
    start = models.DateField(null=True)
    end = models.DateField(default=timezone.now, null=True)


class Project(models.Model):
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    purpose = models.CharField(max_length=100)
    date = models.DateField(default=timezone.now, null=True)


class Education(models.Model):
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, null=False, blank=False, choices=(
        ('high_school', 'High School'), ('bachelor', 'Bachelor'), ('master', 'Master'), ('doctorate', 'Doctorate')))
    institute = models.CharField(max_length=100)
    start = models.CharField(max_length=100)
    end = models.DateField(default=timezone.now, null=True)


class License(models.Model):
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    where = models.CharField(max_length=100)
    when = models.CharField(max_length=100)


class Cert(models.Model):
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    where = models.CharField(max_length=100)
    start = models.DateField(default=timezone.now, null=True)
    end = models.DateField(default=timezone.now, null=True)


class Skill(models.Model):
    user_account = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100, db_index=True)
    level = models.PositiveSmallIntegerField(
        default=3, validators=[MaxValueValidator(100), MinValueValidator(1)])

    class Meta:
        unique_together = ('user_account', 'name')


class Interest(models.Model):
    user_account = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, related_name='interests')
    title = models.CharField(max_length=100, db_index=True)
    since = models.DateField(default=timezone.now, null=True)

    class Meta:
        unique_together = ('user_account', 'title')


class Award(models.Model):
    user_account = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, db_index=True)
    name = models.CharField(max_length=100, db_index=True)
    purpose = models.CharField(max_length=100, db_index=True)
    provider = models.CharField(max_length=100, db_index=True)
    date = models.DateField(db_index=True)
