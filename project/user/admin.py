from django.contrib import admin
from .models import *
admin.site.register(UserAccount)
admin.site.register(Job)
admin.site.register(Application)