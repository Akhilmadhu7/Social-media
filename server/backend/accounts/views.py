
from django.shortcuts import render
import jwt
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from . serializers import AccountSerializer
from rest_framework import status
from . models import Accounts
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
# from rest_framework.authentication.t



class Hello(APIView):

    def get(self,request):
        return Response({"Response":"Hello user"})



class UserRegister(APIView):

    def post(self,request):
        serializer = AccountSerializer(data=request.data)
        
        data = {}
        if serializer.is_valid():
            print('ehittttt')
            accounts = serializer.save()
            data['username'] = accounts.username
            data['username'] = accounts.f_name
            data['username'] = accounts.l_name
            data['username'] = accounts.get_fullname()
            data['Response'] = 'Account registered'
            print('lll')
            return Response(data,status=status.HTTP_201_CREATED)   
        else:
            print('sdjhfg')
            data['Response'] = serializer.errors
            return Response(data, status=status.HTTP_400_BAD_REQUEST)     



class Userlist(APIView):

    def get(self,request):
        try:
            data = {}
            userlist = Accounts.objects.exclude(is_admin = True)
            user_serializer = AccountSerializer(userlist, many = True)  
            data['data'] = user_serializer.data
            data['Response'] = "Success"
            return Response(user_serializer.data)
        except:
            return Response({"message":"Something went wrong"})     

@api_view(['POST'])
def blockUser(request, id):

    try:
        user = Accounts.objects.get(id=id)
    except:
        return Response({"Message":"User does not exist"})  
    data = {}      

    if user.is_active:
        user.is_active = False
        data['Response'] = "User blocked succesfully"
    else:
        user.is_active = True
        data['Response'] = "User unblocked succesfully"    
    user.save() 
    return Response(data)      


class UserPagination(PageNumberPagination):
    page_size = 7

class UserListPage(ListAPIView):
    queryset = Accounts.objects.exclude(is_admin = True)   
    serializer_class = AccountSerializer 
    pagination_class = UserPagination      
                       

