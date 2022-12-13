from rest_framework import serializers
from . models import ChatModel
from accounts.serializers import UserProfileSerializer

class ChatSerializer(serializers.ModelSerializer):
    # sender = UserProfileSerializer()
    # reciever = UserProfileSerializer()
    class Meta:
        model = ChatModel
        fields = '__all__'