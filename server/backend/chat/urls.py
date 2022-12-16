from django.urls import path
from . import views

urlpatterns = [
    path('chat-list',views.chatusers_list,name='chat_list'),
    path('chat-data/<str:username>',views.chat_data,name='chat_data'),
    path('notifications',views.GetNotifications.as_view(),name='notifications')
]
