from django.db import models
from accounts.models import Accounts

# Create your models here.


class ChatModel(models.Model):
    sender = models.CharField(max_length=120, default=None,null=True,blank=True)
    reciever = models.CharField(max_length=123,null=True,blank=True)
    message = models.TextField()
    thread_name = models.CharField(max_length=100, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message
    


class Notifications(models.Model):
    notified_user = models.CharField(max_length=120,null=True,blank=True)
    notified_by = models.ForeignKey(Accounts,related_name='notified_by',on_delete=models.CASCADE)
    notification_text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_seen = models.BooleanField(default=False)


    def __str__(self):
        return self.notified_user+str(self.notified_user)