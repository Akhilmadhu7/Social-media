
from django.shortcuts import render
import jwt
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from . serializers import AccountSerializer, UserProfileSerializer, ChangePasswordSerializer,FollowerSerializer,PostSerializer
from rest_framework import status
from . models import Accounts,Follower,Post
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

    # permission_classes = [permissions.IsAuthenticated]
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
            user_serializer = UserProfileSerializer(user, context={"request":request})
            user_following = len(Follower.objects.filter(follower=id))  #to get the count of following.
            user_followers = len(Follower.objects.filter(username=user.username))   #to get the count of followers.
            print('folling',user_following)
            data['Response'] = "Success"
            data['Data'] = user_serializer.data
            data['userfollowers'] = {
                'followers':user_followers,
                'following':user_following
            }
            print(user_serializer.data['profile_pic'])
            return Response(data, status=status.HTTP_200_OK)
        else:
            data['Response'] = 'User not found' 
            return Response(data, status=status.HTTP_404_NOT_FOUND)

    def put(self, request,id):
        data = {}
        user = self.get_object(id)
        print('aaaa',user)
        print('reqqqq',request.data)
        user_serializer = UserProfileSerializer(user, data=request.data,  context={"request":request})
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
            
            user_following = Follower.objects.filter(follower=user.id) #getting the data of following users of the logged in user.
            print('lllll',user_following)
            all_users = Accounts.objects.filter(state=user.state).exclude(username=user) & Accounts.objects.filter(is_active=True).exclude(username=user)
            user_following_all = []
            print('jjjjjjj',user_following)
            for users in user_following: #looping through the following user
                print('ppppppp')
                user_list = Accounts.objects.get(username=users.username) #getting the following user from accounts.
                print('kkkkkk',user_list)
                user_following_all.append(user_list)
            print('iiiiii',user_following_all)
            suggestion_list = [x for x in list(all_users) if (x not in list(user_following_all))] #collecting the users who has not been followed by logged in user.
            print('oooooo',suggestion_list)  
            return suggestion_list  # returning the users who are related with user profile and not followed by the user
        except Accounts.DoesNotExist:
            raise ValueError({"Error": "User does not exist"})

    def get(self, request):
        data = {}
        print('jkjkjrequest,',request.data)
        friends = self.get_object(request)
        print('ggggg',friends)
        serializer = UserProfileSerializer(friends, many=True, context={"request":request})
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
        if Follower.objects.filter(username=user,follower=follower).first():  #checking if user following or not.
            print('qqqqqqqqqq')
            del_follower = Follower.objects.get(username=user,follower=follower)  #if following , unfollow. 
            del_follower.delete()
            data['follow'] = {
                'follow':'follow'
            }
            data['Response'] = 'Unfollowed succesfully'
            return Response(data,status=status.HTTP_200_OK)
        else:    
            print('yyyyy')
            follower_ser = FollowerSerializer(data=request.data) #if not following.
            if follower_ser.is_valid():
                follower_ser.save()
                data['Data'] = follower_ser.data
                data['Response'] = 'Following'
                return Response(data, status=status.HTTP_200_OK)
            else:
                data['Errors'] = follower_ser.errors
                data['Response'] = 'Something went wrong'   
                return Response(data, status=status.HTTP_400_BAD_REQUEST)


#Friends profile view
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
            user_followers = len(Follower.objects.filter(username=user))    #to get followers count.
            user_following = len(Follower.objects.filter(follower=friend_pro.id)) #to get following count.
            data['userfollowers'] = {
                'followers':user_followers,
                'following':user_following
            }
            if Follower.objects.filter(username=user,follower=request.user.id).first(): #to check if the visiting user following or not this profile.
                data['follow'] = {
                    'followinguser':'following'
                }
                print('aaaa')
            else:
                print('lll')
                data['follow'] = {
                    'followinguser':'follow'
                } 
            user_serializer = UserProfileSerializer(friend_pro, context={"request":request})
            data['Response'] = "Success"
            data['Data'] = user_serializer.data
            print(user_serializer.data['profile_pic'])
            return Response(data, status=status.HTTP_200_OK)
        else:
            data['Response'] = 'User not found' 
            return Response(data, status=status.HTTP_404_NOT_FOUND)


#User Followers function.
@api_view(['GET'])
def followers_list(request):
    data = {}
    username = request.user
    id = request.user.id
    print('username',username,id)
    followers = Follower.objects.filter(username = username)
    user_followers = []
    for users in followers:
        print('ididid',users.follower.id)
        user_list = Accounts.objects.get(id = users.follower.id)
        user_followers.append(user_list)
    print('ssss',user_followers)    
    followers_ser = UserProfileSerializer(user_followers,many=True, context={"request":request})
    data['Data'] = followers_ser.data
    data['Response'] = 'Success'
    return Response(data,status=status.HTTP_200_OK)


#User Following function.
@api_view(['GET'])
def following_list(request):
    data = {}
    id = request.user.id
    following = Follower.objects.filter(follower = id)
    user_following = []
    for users in following:
        user_list = Accounts.objects.get(username=users)
        user_following.append(user_list)
    following_ser = UserProfileSerializer(user_following,many=True, context={"request":request})
    data['Data'] = following_ser.data
    data['follow'] = {
        'follow':'following'
    }
    data['Response'] = 'Succcess'
    return Response (data,status=status.HTTP_200_OK)   
       
   


class Post_view(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self,user):
        try:
            # a = Accounts.objects.get(username = user)
            # return Post.objects.filter(user=a.id)
            return Post.objects.filter(user=user)
        except:
            return Response({'Errors':"Post does not exist"})    

    #function for get all post created by user in userprofile page
    def get(self,request):
        data = {}
        print('rewq daa',request.data)
        # user = request.data['username']
        user = request.user
        print('lklk',user)
        post = self.get_object(user)
        print('post',post)
        post_data = PostSerializer(post,many=True,context = {'request':request})
        print('jjjjjjjj',post_data.data)
        data['Data'] = post_data.data
        data['Response'] = 'Success'
        return Response(data,status=status.HTTP_200_OK)

    #Create Post function.
    def post(self,request):
        print('dataaa',request.data)
        data = {}
        user_id = request.user.id
        print('pppp')
        post_ser = PostSerializer(data=request.data)
        print('lllll')
        if post_ser.is_valid():
            post_ser.save()
            data['Data'] = post_ser.data
            data['Response'] = 'Post added succesfully'
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            print('eeee')
            data['Data'] = post_ser.errors
            data['Response'] = 'Something went wrong'
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def home_view(request):

#     id = request.user.id
#     print('user',id)
#     following_users = Follower.objects.filter(follower = id)
#     ser = FollowerSerializer(following_users,many=True)
#     following_userslist = []
#     feed_list = []

#     for users in following_users:
#         print('ssssss',users)
#         accounts = Accounts.objects.get(username = users)
#         print('acccccc',accounts.id)
#         following_userslist.append(accounts.id)

    
#     for users in following_userslist:
#         print('uuuuuuuu',users)
#         feed=Post.objects.filter(user = users).values()
#         feed_list.append(feed)
#     feed_post = feed_list

#     for f in feed_post:
#         print('ffffff',f)
#     serp = PostSerializer(feed_list,many=True)      
#     print('serserser',serp)

#     return Response(ser.data)

class HomeView(APIView):

    def get_object(self,id):
        try:
            following_users = Follower.objects.filter(follower = id)
            following_userslist = []
            feed_list = []

            for users in following_users:
                print('ssssss',users)
                accounts = Accounts.objects.get(username = users)
                print('acccccc',accounts.id)
                following_userslist.append(accounts.id)

            
            for users in following_userslist:
                print('uuuuuuuu',users)
                feed=Post.objects.filter(user = users).values()
                feed_list.append(feed)
            return feed_list
        except:
            return  Response({"asfd":"asdf"})   

    def get(self,request):

        id  = request.user.id
        post = self.get_object(id)
        print('apo engana',post)
        ser = PostSerializer(post,many=True,context={'request':request})
        print('ser data',ser.data)
        return Response({"mes":"hellow"})




class Home_view(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def get(self,request):
        post = Post.objects.all()
        post_ser = PostSerializer(post,many=True)
        return Response(post_ser.data)


    def post(self,request):
        post = PostSerializer(data=request.data)
        if post.is_valid():
            post.save()
            return Response(post.data)
        else:
            return Response(post.errors)        