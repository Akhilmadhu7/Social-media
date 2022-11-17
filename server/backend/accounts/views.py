
from django.shortcuts import render
import jwt
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from . serializers import AccountSerializer, UserProfileSerializer, ChangePasswordSerializer
from rest_framework import status
from . models import Accounts
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser


class Hello(APIView):

    def get(self, request):
        return Response({"Response": "Hello user"})


class UserRegister(APIView):

    def post(self, request):
        serializer = AccountSerializer(data=request.data)

        data = {}
        if serializer.is_valid():
            accounts = serializer.save()
            data['username'] = accounts.username
            data['Response'] = 'Account registered'
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            print('sdjhfg')
            data['Response'] = serializer.errors
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


class Userlist(APIView):

    def get(self, request):
        try:
            data = {}
            userlist = Accounts.objects.exclude(is_admin=True)
            user_serializer = AccountSerializer(userlist, many=True)
            data['data'] = user_serializer.data
            data['Response'] = "Success"
            return Response(data, status=status.HTTP_200_OK)
        except:
            data['Response'] = "Something went wrong"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def blockUser(request, id):

    try:
        user = Accounts.objects.get(id=id)
    except:
        return Response({"Message": "User does not exist"})
    data = {}

    if user.is_active:
        user.is_active = False
        data['Response'] = "User blocked succesfully"
    else:
        user.is_active = True
        data['Response'] = "User unblocked succesfully"
    user.save()
    return Response(data, status=status.HTTP_200_OK)


class UserProfile(APIView):

    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, id):
        try:
            return Accounts.objects.get(id=id)

        except Accounts.DoesNotExist:
            raise ValueError({"Message": "User does not exist"})

    def get(self, request, id):
        data = {}
        print('idddd',id)
        user = self.get_object(id)
        user_serializer = UserProfileSerializer(user)
        data['Response'] = "Success"
        data['Data'] = user_serializer.data
        print(user_serializer.data['profile_pic'])
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, id):
        data = {}
        user = self.get_object(id)
        user_serializer = UserProfileSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            data['Data'] = user_serializer.data
            data["Response"] = "Updated Successfully"
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            data['Errors'] = user_serializer.errors
            data["Response"] = "Something went wrong"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id,):
        try:
            return Accounts.objects.get(id=id)

        except Accounts.DoesNotExist:
            raise ValueError({"Message": "User does not exist"})

    def put(self, request, id):
        self.object = self.get_object(id)
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get('password')):
                return Response(
                    {"password": "Wrong password"}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get('new_password'))
            self.object.save()
            return Response(
                {"Message": "Password changed successfully"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NewFriendsView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, request):
        try:
            user = request.user
            return Accounts.objects.filter(place=user.place).exclude(username=user) | Accounts.objects.filter(state=user.state).exclude(username=user)
        except Accounts.DoesNotExist:
            raise ValueError({"Error": "User does not exist"})

    def get(self, request):
        data = {}
        print('hello')
        friends = self.get_object(request)
        print(friends)
        serializer = UserProfileSerializer(friends, many=True)
        data['Response'] = serializer.data
        data['Message'] = 'Success'
        return Response(data, status=status.HTTP_200_OK)
