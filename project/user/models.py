from django.contrib.auth.models import User
from django.db import models


class UserAccount(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    type_job = models.CharField(max_length=50, default='user')
    company_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(default='default@default.com')

    def __str__(self):
        return self.user.username
