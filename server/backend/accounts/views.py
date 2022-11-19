
from django.shortcuts import render
import jwt
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from . serializers import AccountSerializer, UserProfileSerializer, ChangePasswordSerializer,FollowerSerializer
from rest_framework import status
from . models import Accounts,Follower
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser


class Hello(APIView):

    def get(self, request):
        return Response({"Response": "Hello user"})

# Register a new account function

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


#Function for user profile and update userprofile details

class UserProfile(APIView):

    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, id):
        try:
            return Accounts.objects.get(id=id, is_active = True) 

        except Accounts.DoesNotExist:
            Response({"Message": "User does not exist"})
        

    def get(self, request,id):
        data = {}
        print('sss',request.user.username)
        user = self.get_object(id)
        print('uaa',user.id)
        if user is not None:
            user_serializer = UserProfileSerializer(user)
            user_following = len(Follower.objects.filter(follower=id))
            user_followers = len(Follower.objects.filter(username=user.username))
            print('folling',user_following)
            data['Response'] = "Success"
            data['Data'] = user_serializer.data
            data['following'] = user_following
            data['followers'] = user_followers
            print(user_serializer.data['profile_pic'])
            return Response(data, status=status.HTTP_200_OK)
        else:
            data['Response'] = 'User not found' 
            return Response(data, status=status.HTTP_404_NOT_FOUND)

    def put(self, request,id):
        data = {}
        user = self.get_object(id)
        print('aaaa',user)
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


# Change password function
 
class ChangePassword(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, request):
        try:
            user_id = request.user.id
            return Accounts.objects.get(id=user_id)

        except Accounts.DoesNotExist:
            raise ValueError({"Message": "User does not exist"})

    def put(self, request):
        self.object = self.get_object(request)
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


# Friends suggestion function

class NewFriendsView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, request):
        try:
            user = request.user
            
            user_following = Follower.objects.filter(follower=user.id)
            print('lllll',user_following)
            all_users = Accounts.objects.filter(place=user.place).exclude(username=user) & Accounts.objects.filter(is_active=True).exclude(username=user)
            user_following_all = []
            print('jjjjjjj',user_following)
            for users in user_following:
                print('ppppppp')
                user_list = Accounts.objects.get(username=users.username)
                print('kkkkkk',user_list)
                user_following_all.append(user_list)
            print('iiiiii',user_following_all)
            suggestion_list = [x for x in list(all_users) if (x not in list(user_following_all))]
            print('oooooo',suggestion_list)  
            return suggestion_list  
            # return Accounts.objects.filter(place=user.place).exclude(username=user) & Accounts.objects.filter(is_active=True).exclude(username=user)
        except Accounts.DoesNotExist:
            raise ValueError({"Error": "User does not exist"})

    def get(self, request):
        data = {}
        print('jkjkjrequest,',request.data)
        friends = self.get_object(request)
        print('ggggg',friends)
        # follo'f',wers = {}
        # for fol in friends:
        #     followers['username'] = request.user.username
        #     followers['follower'] = fol.id
        # print('followers',followers)
        serializer = UserProfileSerializer(friends, many=True)
        data['Response'] = serializer.data
        data['Message'] = 'Success'

        return Response(data, status=status.HTTP_200_OK)


# Follow users function

class FollowUsers(APIView):

    def get_object(self,id):
        try:
            return Accounts.objects.get(id=id)
        except:
            return Response({"Respone":"Account does not exist"})    

    #Follow user
    def post(self,request):
        data = {}
        print('wewewe',request.data)
        # user= self.get_object(request.data['username'])
        user= request.data['username']
        print('oooo',user)
        print('dd')
        follower = request.data['follower']
        print('dddddd',follower)
        # follower_id = self.get_object(follower)
        if Follower.objects.filter(username=user,follower=follower).first():
            print('qqqqqqqqqq')
            del_follower = Follower.objects.get(username=user,follower=follower)
            del_follower.delete()
            return Response({"Response":"Unfollowed succesfully"},status=status.HTTP_200_OK)
        else:    
            print('yyyyy')
            follower_ser = FollowerSerializer(data=request.data)
            if follower_ser.is_valid():
                follower_ser.save()
                data['Data'] = follower_ser.data
                data['Response'] = 'Following'
                return Response(data, status=status.HTTP_200_OK)
            else:
                data['Errors'] = follower_ser.errors
                data['Response'] = 'Something went wrong'   
                return Response(data, status=status.HTTP_400_BAD_REQUEST)

#     #Unfollow user
#     def delete(self,request):
#         print(request.data)
#         username = request.data['username']
#         print('dd')
#         follower = request.data['follower']
#         print('dddddd')
#         if Follower.objects.filter(username=username,follower=follower).first():
#             print('qqqqqqqqqq')
#             del_follower = Follower.objects.get(username=username,follower=follower)
#             del_follower.delete()
#             return Response({"Response":"Unfollowed succesfully"},status=status.HTTP_200_OK)
#         else:
#             return Response({"Response":"Something went wrong"},status=status.HTTP_400_BAD_REQUEST)


class FriendsProfileView(APIView):

    def get_object(self,user):
        try:
            return Accounts.objects.get(username=user)
        except:
            return Response({"Response":"User does not exist"})    

    def get(self,request,user):
        data = {}
        friend_pro = self.get_object(user)
        print('friend',friend_pro)
        print('foll',request.user.id)
        if friend_pro is not None:
            user_followers = len(Follower.objects.filter(username=user))
            user_following = len(Follower.objects.filter(follower=friend_pro.id))
            data['followers'] = user_followers
            data['following'] = user_following
            if Follower.objects.filter(username=user,follower=request.user.id).first():
                data['follow'] = 'following'
                print('aaaa')
            else:
                print('lll')
                data['unfollow']  = 'follow' 
            user_serializer = UserProfileSerializer(friend_pro)
            data['Response'] = "Success"
            data['Data'] = user_serializer.data
            print(user_serializer.data['profile_pic'])
            return Response(data, status=status.HTTP_200_OK)
        else:
            data['Response'] = 'User not found' 
            return Response(data, status=status.HTTP_404_NOT_FOUND)


       
   
