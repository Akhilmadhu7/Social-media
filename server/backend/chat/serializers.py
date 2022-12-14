from rest_framework import serializers
from . models import ChatModel,Notifications,ChatMessages
from accounts.serializers import UserProfileSerializer

class ChatSerializer(serializers.ModelSerializer):
    # sender = UserProfileSerializer()
    # reciever = UserProfileSerializer()
    class Meta:
        model = ChatModel
        fields = '__all__'

class ChatMesssageSerializer(serializers.ModelSerializer):
    sender = UserProfileSerializer()
    # reciever = UserProfileSerializer()
    class Meta:
        model = ChatMessages
        fields='__all__'


class NotificationSerializer(serializers.ModelSerializer):
    notify_sender = UserProfileSerializer()
    class Meta:
        model = Notifications
        fields = '__all__'

