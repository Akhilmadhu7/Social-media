from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
import json
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from . models import ChatModel,Notifications
from accounts.models import Accounts






class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # my_id = self.scope['user'].id
        my_id = self.scope['url_route']['kwargs']['myid']
        # my_id=3
        print('my id',my_id)
        other_user_id = self.scope['url_route']['kwargs']['id']
        print('other id',other_user_id)

        if int(my_id) > int(other_user_id):
            print('my printid',my_id)
            self.room_name = f'{my_id}-{other_user_id}'
        else:
            print('otherkkkk id',other_user_id)
            self.room_name = f'{other_user_id}-{my_id}'    

        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )   

        await self.accept() 
        # await self.send(text_data=self.room_group_name)

    async def disconnect(self,code):
        print('sajdkfh')
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


    async def receive(self,text_data=None,bytes_data=None):
        data = json.loads(text_data)
        messsage = data['message']
        username = data['username']
        reciever_user = data['reciever_user']

        await self.save_messages(username,self.room_group_name,messsage,reciever_user)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'chat_message',
                'message':messsage,
                'username':username,
                'reciever_user':reciever_user
            }
        )

    async def chat_message(self,event):
        message = event['message']
        username = event['username'] 
        reciever_user = event['reciever_user']  

        await self.send(text_data=json.dumps({
            'message':message,
            'username':username,
            'reciever_user':reciever_user
        }))  

    @database_sync_to_async
    def save_messages(self,username,thread_name,message,reciever_user):
        ChatModel.objects.create(
            sender=username,reciever=reciever_user,thread_name=thread_name,message=message
        )
        


class Notifications(AsyncWebsocketConsumer):
    
    async def connect(self):
        
        other_user_id = self.scope['url_route']['kwargs']['id']
        print('other id',other_user_id)

        self.room_name = f'{other_user_id}'
    

        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )   

        await self.accept() 
        # await self.send(text_data=self.room_group_name)


    # async def disconnect(self,code):
    #     print('sajdkfh')
    #     await self.channel_layer.group_discard(
    #         self.room_group_name,
    #         self.channel_name
    #     )   


    # async def receive(self,text_data=None,bytes_data=None):
    #     data = json.loads(text_data)
    #     messsage = data['message']
    #     username = data['username']
    #     reciever_user = data['reciever_user']

    #     await self.save_messages(username,self.room_group_name,messsage,reciever_user)
    #     await self.channel_layer.group_send(
    #         self.room_group_name,
    #         {
    #             'type':'chat_message',
    #             'message':messsage,
    #             'username':username,
    #             'reciever_user':reciever_user
    #         }
    #     ) 


    # async def chat_message(self,event):
    #     message = event['message']
    #     username = event['username'] 
    #     reciever_user = event['reciever_user']  

    #     await self.send(text_data=json.dumps({
    #         'message':message,
    #         'username':username,
    #         'reciever_user':reciever_user
    #     }))  

    # @database_sync_to_async
    # def save_messages(self,username,thread_name,message,reciever_user):
    #     ChatModel.objects.create(
    #         sender=username,reciever=reciever_user,thread_name=thread_name,message=message
    #     )        