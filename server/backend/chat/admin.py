from django.contrib import admin
from . models import ChatModel,Notifications,ChatMessages

# Register your models here.

admin.site.register(ChatModel)

admin.site.register(Notifications)

admin.site.register(ChatMessages)