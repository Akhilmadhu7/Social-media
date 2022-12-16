from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from accounts.models import Accounts
from accounts.serializers import UserProfileSerializer
from . models import ChatModel, Notifications,ChatMessages
from . serializers import ChatSerializer, NotificationSerializer,ChatMesssageSerializer
from django.db.models import Q
from rest_framework.decorators import api_view

# Create your views here.


# @api_view(['GET'])
# def chatusers_list(request):
#     print('usernameis here')
#     users = Accounts.objects.all()
#     user_ser = UserProfileSerializer(users,many=True)
#     return Response(user_ser.data, status=status.HTTP_200_OK)



@api_view(['GET'])
def chatusers_list(request):
    print('req',request.user.id)
    print('ussss',request.user)
    # users = Account.objects.exclude(username = request.user.username)
    accounts = Accounts.objects.exclude(username=request.user)  #getting all users except logged in user.
    chat_list = set()
    chat_users = ChatMessages.objects.filter(Q(sender=request.user.id) | Q(reciever=request.user.id)) #getting all the users 
    
    print('hereherher',chat_users)
    for chat_user in chat_users:
        # if str(request.user.id) in chat_user.thread_name:
        print('hjhj',chat_user.reciever,'ll',chat_user.sender)
        chat_list.add(chat_user.sender)
        chat_list.add(chat_user.reciever)   
    
    user_list = []
    for user in accounts:
        if user in chat_list:  
            user_list.append(user) 

    user_ser = UserProfileSerializer(user_list, many=True,context={'request':request})
    return Response(user_ser.data)



@api_view(['GET'])
def chat_data(request,username):
    try:
        user_obj = Accounts.objects.get(username=username) 
    except:
        pass    
    print('reciever',user_obj.id,'sender',request.user)
    users = Accounts.objects.exclude(username = request.user.username)
    if request.user.id > user_obj.id:
        thread_name = f'chat_{request.user.id}-{user_obj.id}'
    else:
        thread_name = f'chat_{user_obj.id}-{request.user.id}'  
    message_obj = ChatMessages.objects.filter(thread_name=thread_name)    
    chat_ser = ChatMesssageSerializer(message_obj,many=True, context={'request':request})
    print('lll',user_obj.username,request.user.id)
    # print('message_obj',chat_ser.data) 
    return Response(chat_ser.data)
  
        

class GetNotifications(APIView):

    def get_object(self,user):
        try:
            return Notifications.objects.filter(notify_receiver=user,is_seen=False)
        except:
            return None    

    def get(self,request):
        data = {}
        notifications = self.get_object(request.user)
        notify_ser = NotificationSerializer(notifications,many=True)
        data['Data'] = notify_ser.data
        return Response(data,status=status.HTTP_200_OK)
        
    def patch(self,request):
        data={}
        print('reqasdkl notif data',request.user)
        notifications = self.get_object(request.user)
        for notif in notifications:
            if notif.is_seen == False:
                notif.is_seen = True
                notif.save()
            else:
                pass
        all_notifications = Notifications.objects.filter(notify_receiver=request.user).order_by('-id')
        notify_ser = NotificationSerializer(all_notifications,many=True,context={'request':request})
        data['Data'] = notify_ser.data
        return Response(data,status=status.HTTP_200_OK)    
















