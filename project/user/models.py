from django.db import models


class UserAccount(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=128)
    username = models.CharField(max_length=150)
    user_type = models.CharField(max_length=50, choices=[
                                 ('user', 'User'), ('admin', 'Admin')])
    company_name = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return self.email
