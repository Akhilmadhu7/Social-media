from django.db import models

# Create your models here.


class ChatModel(models.Model):
    sender = models.CharField(max_length=120, default=None)
    reciever = models.CharField(max_length=123,null=True,blank=True)
    message = models.TextField()
    thread_name = models.CharField(max_length=100, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message
    
