import site
from django.contrib import admin
from . models import Accounts,Follower,Post,LikePost

# Register your models here.

admin.site.register(Accounts)

admin.site.register(Follower)

admin.site.register(Post)

admin.site.register(LikePost)
