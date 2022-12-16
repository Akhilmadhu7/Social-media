from django.contrib import admin
from . models import ChatModel,Notifications,ChatMessages,ChatNotifications

# Register your models here.

admin.site.register(ChatModel)

admin.site.register(Notifications)

admin.site.register(ChatMessages)

admin.site.register(ChatNotifications)