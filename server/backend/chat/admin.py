from django.contrib import admin
from . models import ChatModel,Notifications

# Register your models here.

admin.site.register(ChatModel)

admin.site.register(Notifications)