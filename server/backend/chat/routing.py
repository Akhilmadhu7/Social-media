from django.urls import re_path,path
from . import consumers

websocket_urlpatterns = [
    # re_path(r'ws/chat/(?p<room_name>\w+)/$', consumers.ChatRoomConsumer,)
    path('ws/<int:myid>/<int:id>/',consumers.PersonalChatConsumer.as_asgi()),
    path('ws/<int:id>/',consumers.Notifications.as_asgi())
    # path('ws/<int:id>/',PersonalChatConsumer)
]