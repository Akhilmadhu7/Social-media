from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from accounts.models import Accounts
from accounts.serializers import UserProfileSerializer
from . models import ChatModel
from . serializers import ChatSerializer

# Create your views here.


@api_view(['GET'])
def chatusers_list(request):
    print('usernameis here')
    users = Accounts.objects.all()
    user_ser = UserProfileSerializer(users,many=True)
    return Response(user_ser.data, status=status.HTTP_200_OK)



@api_view(['GET'])
def chat_data(request,username):
    user_obj = Accounts.objects.get(username=username)
    print('reciever',user_obj.id,'sender',request.user)
    users = Accounts.objects.exclude(username = request.user.username)
    if request.user.id > user_obj.id:
        thread_name = f'chat_{request.user.id}-{user_obj.id}'
    else:
        thread_name = f'chat_{user_obj.id}-{request.user.id}'  
    message_obj = ChatModel.objects.filter(thread_name=thread_name)    
    chat_ser = ChatSerializer(message_obj,many=True)
    print('lll',user_obj.username,request.user.id)
    # print('message_obj',chat_ser.data) 
    return Response(chat_ser.data) 
    # return Response('data data')    
