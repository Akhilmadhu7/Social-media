

from django.db import models
from datetime import datetime

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


def upload_to(instance, filename):
    return 'profile_image/{filename}'.format(filename=filename)

def post_pic(instance, filename):
    return 'post_image/{filename}'.format(filename=filename)

class UserManager(BaseUserManager):
    def _create_user(self, username, email, password, is_active, is_staff, is_admin, is_superadmin, **extra_fields):

        if not username:
            raise ValueError('User must have an username')
        if not email:
            raise ValueError('User must have an email')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, is_active=is_active,
                          is_admin=is_admin, is_staff=is_staff, is_superadmin=is_superadmin, **extra_fields

                          )
        user.set_password(password)
        user.save(using=self.db)

        return user

    def create_user(self, username, email, password, **extra_fields):

        return self._create_user(username, email, password, is_active=True, is_staff=False,
                                 is_admin=False, is_superadmin=False, **extra_fields
                                 )

    def create_superuser(self, username, email, password, **extra_fields):

        user = self._create_user(username, email, password, is_active=True, is_staff=True,
                                 is_admin=True, is_superadmin=True, **extra_fields)

        user.save(using=self.db)
        return user


class Accounts(AbstractBaseUser):
    username = models.CharField(max_length=120, unique=True)
    f_name = models.CharField(max_length=120)
    l_name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10, unique=True)

    profile_pic = models.ImageField(
        upload_to=upload_to, null=True, blank=True)
    cover_pic = models.ImageField(
        upload_to='cover_image', null=True, blank=True)
    birth_date = models.DateTimeField(null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    place = models.CharField(max_length=200, null=True, blank=True)
    state = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    is_logged = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superadmin = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True



class Follower(models.Model):

    follower = models.ForeignKey(Accounts,related_name = 'follower', on_delete=models.CASCADE) #person who is following(logged in user)
    username = models.CharField(max_length = 120)  #person who has been followed(visited profile person)

    def __str__(self):
        return self.username
     



class Post(models.Model):
    user = models.ForeignKey(Accounts,related_name='user',on_delete=models.CASCADE)
    post_image = models.ImageField(upload_to=post_pic,null=True,blank=True)
    caption = models.TextField(blank=True,default='')
    likes_no = models.IntegerField(default=0)
    # liked_user = models.CharField(max_length=120,default='')
    created_at = models.DateTimeField(default = datetime.now)

    def __str__(self):
        return self.user.username


class LikePost(models.Model):

    post_id = models.CharField(max_length=120)
    username = models.CharField(max_length=120)

    def __str__(self):
        return self.username
    
    
    