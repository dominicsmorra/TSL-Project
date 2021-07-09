from django.contrib.auth.models import AbstractUser
from django.db import models

class Post(models.Model):
    user = models.CharField(max_length=150, default="", unique=False)
    entry = models.CharField(max_length=248, default="")

class CustomUser(AbstractUser):
    bio = models.CharField(max_length=100, default="")
