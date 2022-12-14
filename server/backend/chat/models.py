from django.db import models
from accounts.models import Accounts

# Create your models here.


class ChatModel(models.Model):
    sender = models.CharField(max_length=120, default=None,null=True,blank=True)  #the one who send the message.
    reciever = models.CharField(max_length=123,null=True,blank=True)  #one who will get the message.
    message = models.TextField()
    thread_name = models.CharField(max_length=100, null=True, blank=True)  #unique channel name for the two users to communicate.
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message

class ChatMessages(models.Model):
    sender = models.ForeignKey(Accounts,related_name='sender',on_delete=models.CASCADE)
    reciever = models.ForeignKey(Accounts,related_name='reciever',on_delete=models.CASCADE)
    message = models.CharField(max_length=120,null=True,blank=True)
    thread_name = models.CharField(max_length=100,null=True,blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message
    
    


class Notifications(models.Model):
    notify_receiver = models.CharField(max_length=120,null=True,blank=True) #the  one who will get the notification.
    notify_sender = models.ForeignKey(Accounts,related_name='notified_by',on_delete=models.CASCADE)  #one who made the action.
    notification_text = models.TextField()
    thread_name = models.CharField(max_length=120,null=True,blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_seen = models.BooleanField(default=False)
    notify_count = models.IntegerField(default=0)


    def __str__(self):
        return f"{self.notification_text} {str(self.notify_receiver)}"