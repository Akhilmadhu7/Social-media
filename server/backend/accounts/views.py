
from django.shortcuts import render
import random
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from . serializers import (AccountSerializer, UserProfileSerializer,
                           ChangePasswordSerializer, FollowerSerializer, PostSerializer,
                           PostCreateSerializer, CommentSerializer, CommentCreateSerializer)
from rest_framework import status
from . models import Accounts, Follower, Post, LikePost, Comment
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from chat.models import Notifications
from chat.serializers import NotificationSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json
from backend.settings import EMAIL_HOST_USER
from django.core.mail import send_mail


class Hello(APIView):

    def get(self, request):
        return Response({"Response": "Hello user"})

# @api_view(['Get'])
def email_send(email): 
    print('veenfum')
    sub = 'Account verification'
    otp = ''
    for i in range(0,6):
        otp += str(random.randint(0,9))
    msg = 'Your otp number is '+otp
    try:
        accounts = Accounts.objects.get(email=email)
    except:
        return None
    if accounts:
        accounts.otp = otp
        accounts.save() 
    else:
        pass                   
    send_mail(sub,msg,EMAIL_HOST_USER,[email])
    return True

#otp verification
@api_view(['POST'])
def otp_verification(request):
    print('reaa',request.data)
    data = {}
    otp_no = request.data['otp']
    try:
        accounts = Accounts.objects.get(otp=otp_no)
    except:
        print('bad, response is not success')
        data['Error'] = 'Invalid otp number'     
        return Response(data, status=status.HTTP_400_BAD_REQUEST) 
    if accounts:
        accounts.is_verified = True
        accounts.save()
        print('hello respponse is success')
        data['Response'] = 'Account verified'
        return Response(data, status=status.HTTP_200_OK) 
    # else:
    #     print('bad, response is not success')
    #     data['Error'] = 'Invalid otp number'     
    #     return Response(data, status=status.HTTP_400_BAD_REQUEST)  


#resend otp funciton
@api_view(['POST'])
def resend_otp(request):
    data = {}
    email = request.data['email']
    print('here is the email',email)
    resend = email_send(email)
    if resend:
        data['Response'] = 'Otp resend succesfully'
        return Response(data, status=status.HTTP_200_OK)



# Register a new account function
class UserRegister(APIView):

    def post(self, request):
        serializer = AccountSerializer(data=request.data)

        data = {}
        # mail_send = email_send(data['email'])
        # if mail_send:
        #     verify_account = otp_verification(mail_send)
        if serializer.is_valid():
            accounts = serializer.save()
            data['username'] = accounts.username
            data['Response'] = 'Account registered'
            mail = email_send(request.data['email'])
            if mail == True:
                return Response(data, status=status.HTTP_201_CREATED)
            else:
                data['Response'] = 'Something went wrong'
                return Response(data,status=status.HTTP_403_FORBIDDEN)    
        else:
            print('sdjhfg')
            data['Response'] = serializer.errors
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


# Function for user profile and update userprofile details
class UserProfile(APIView):

    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, id):
        try:
            return Accounts.objects.get(id=id, is_active=True)
        except Accounts.DoesNotExist:
            Response({"Message": "User does not exist"})

    def get(self, request, id):
        data = {}
        print('sss', request.user.username)
        user = self.get_object(id)
        print('uaa', user.id)
        if user is not None:
            user_serializer = UserProfileSerializer(
                user, context={"request": request})
            # to get the count of following.
            user_following = len(Follower.objects.filter(follower=id))
            # to get the count of followers.
            user_followers = len(
                Follower.objects.filter(username=user.username))
            print('folling', user_following)
            post_count = len(
                Post.objects.filter(user = id))
            data['Response'] = "Success"
            data['Data'] = user_serializer.data
            data['userfollowers'] = {
                'followers': user_followers,
                'following': user_following
            }
            data['count'] = {
                'post_count':post_count
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            data['Response'] = 'User not found'
            return Response(data, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        data = {}
        user = self.get_object(id)
        print('aaaa', user)
        print('reqqqq', request.data)
        user_serializer = UserProfileSerializer(
            user, data=request.data,  context={"request": request})
        if user_serializer.is_valid():
            user_serializer.save()
            data['Data'] = user_serializer.data
            data["Response"] = "Updated Successfully"
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            data['Errors'] = user_serializer.errors
            data["Response"] = "Something went wrong"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


    #for updating profile picture.
    def patch(self,request,id):
        user = self.get_object(id)
        print('request image',request.data['profile_pic'])
        user.profile_pic = request.data.get('profile_pic',user.profile_pic)
        user.save()
        profile_ser = UserProfileSerializer(user,context={'request':request})
        print('prfoileserere',profile_ser.data['profile_pic'])
        return Response(profile_ser.data,status=status.HTTP_202_ACCEPTED)


    #for deleting profile picture.
    def delete(self,request,id):
        data = {}
        user = self.get_object(id) 
        user.profile_pic.delete()
        data['Data'] = 'Profile picture deleted'
        return Response(data, status=status.HTTP_200_OK)   



# Change password function
class ChangePassword(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, request):
        try:
            user_id = request.user.id
            return Accounts.objects.get(id=user_id)

        except Accounts.DoesNotExist:
            return Response({"Message": "User does not exist"},status=status.HTTP_404_NOT_FOUND)

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

            # getting the data of following users of the logged in user.
            user_following = Follower.objects.filter(follower=user.id)
            print('lllll', user_following)
            all_users = Accounts.objects.filter(state=user.state).exclude(
                username=user) & Accounts.objects.filter(is_active=True).exclude(
                username=user) & Accounts.objects.filter(is_deactivated=False).exclude(username=user)
            user_following_all = []
            print('jjjjjjj', user_following)
            for users in user_following:  # looping through the following user
                print('ppppppp')
                # getting the following user from accounts.
                user_list = Accounts.objects.get(username=users.username)
                print('kkkkkk', user_list)
                user_following_all.append(user_list)
            print('iiiiii', user_following_all)
            # collecting the users who has not been followed by logged in user.
            suggestion_list = [x for x in list(all_users) if (
                x not in list(user_following_all))]
            print('oooooo', suggestion_list)
            # returning the users who are related with user profile and not followed by the user
            return suggestion_list
        except Accounts.DoesNotExist:
            return Response({"Error": "User does not exist"})

    def get(self, request):
        data = {}
        print('jkjkjrequest,', request.data)
        friends = self.get_object(request)
        print('ggggg', friends)
        serializer = UserProfileSerializer(
            friends, many=True, context={"request": request})
        data['Response'] = serializer.data
        data['Message'] = 'Success'

        return Response(data, status=status.HTTP_200_OK)


          
#Function to send notifications.
def sendNotifications(text,notify_sender,user):

    #notify sender is the user one who made the actoin to get the notification.
    #user is the on who will get the notification(notificatoin receiver).
    #text contains the text data to show the notification.
    
    room_group_name = 'notify_%s' % f'{user}'  #creating a group for the notification.
    #creating the notification instance.
    notify_obj = Notifications.objects.create(
        notify_receiver=user,notify_sender=notify_sender,
        notification_text=text,thread_name=room_group_name
    )
    notify_obj.save()
    notifications = Notifications.objects.filter(is_seen=False,notify_receiver=user).order_by('-id')    #getting all the unseen notifications.
    notify_ser = NotificationSerializer(notifications,many=True)
    #passing the serialized data to channel layer to send the notifications to the users in the group.
    channel_layer=get_channel_layer()
    async_to_sync (channel_layer.group_send)(
    room_group_name,{
        "type":"send_notifications",
        "value":json.dumps(notify_ser.data)
        }
    )
    return 


# Follow users function
class FollowUsers(APIView):

    def get_object(self, id):
        try:
            return Accounts.objects.get(id=id)
        except:
            return Response({"Respone": "Account does not exist"})

    # Follow user
    def post(self, request):
        data = {}
        print('wewewe it works here', request.data)
        # user= self.get_object(request.data['username'])
        user = request.data['username']
        print('oooo', user)
        print('dd')
        follower = request.data['follower']
        print('dddddd', follower)
        # follower_id = self.get_object(follower)
        # checking if user following or not. if following, unfollow.
        if Follower.objects.filter(username=user, follower=follower).first():
            print('qqqqqqqqqq')
            # if following , unfollow the profile.
            del_follower = Follower.objects.get(
                username=user, follower=follower)
            del_follower.delete()
            data['follow'] = {
                'follow': 'follow'
            }
            # data['Response'] = 'Unfollowed succesfully'
            data['follow'] = 'follow'
            return Response(data, status=status.HTTP_200_OK)
        #else follow user.    
        else:
            print('yyyyy')
            follower_ser = FollowerSerializer(data=request.data)
            if follower_ser.is_valid():
                follower_ser.save()
                data['Data'] = follower_ser.data
                # data['Response'] = 'Following'
                data['follow'] = 'following'

                #send notification if user follow other user.
                #follower contains the id of the notify sender.
                notify_sender = self.get_object(follower) #notify sender is the one who made the action.
                
                # room_group_name = 'notify_%s' % f'{user}'  #creating a group for the notification.
                notify_text = f"{notify_sender} started following you"   #creating the text message if anyone follow a user.
                # notify_obj = Notifications.objects.create(
                #     notify_receiver=user,notify_sender=notify_sender,
                #     notification_text=notify_text,thread_name=room_group_name
                # )
                # notify_obj.save()
                # notifications = Notifications.objects.filter(is_seen=False,notify_receiver=user).order_by('-id')    #getting all the unseen notifications.
                # notify_ser = NotificationSerializer(notifications,many=True)


                #passing the serialized data to channel layer to send the notifications to the users in the group.

                
                # channel_layer=get_channel_layer()
                # async_to_sync (channel_layer.group_send)(
                # room_group_name,{
                #     "type":"send_notifications",
                #     "value":json.dumps(notify_ser.data)
                # }
                # )
                sendNotifications(notify_text,notify_sender,user)
                
                return Response(data, status=status.HTTP_200_OK)
            else:
                data['Errors'] = follower_ser.errors
                data['Response'] = 'Something went wrong'
                return Response(data, status=status.HTTP_400_BAD_REQUEST)

  
# Friends profile view
class FriendsProfileView(APIView):

    def get_object(self, user):
        try:
            return Accounts.objects.get(username=user,is_deactivated=False)
        except:
            print('nonenoenoe')
            return None
            # return Response({"Response": "User does not exist"})

    def get(self, request, user):
        data = {}
        friend_pro = self.get_object(user)
        print('propropropropro',friend_pro)
        if friend_pro is not None:
            print('friend', user)
            print('foll', request.user)
            print('friend ididid', friend_pro.id)
            # to get followers count.
            user_followers = len(Follower.objects.filter(username=user))
            # to get following count.
            user_following = len(
                Follower.objects.filter(follower=friend_pro.id))
            data['userfollowers'] = {
                'followers': user_followers,
                'following': user_following
            }
            post_count = len(
                Post.objects.filter(user = friend_pro.id)
            )
            # checking if the logged in user following or not the visiting profile.
            if Follower.objects.filter(username=user, follower=request.user.id).first():
                data['follow'] = {
                    'followinguser': 'following'
                } 
            else:
                #checking if the visiting profile user is following logged in user or not.
                if Follower.objects.filter(follower=friend_pro.id, username=request.user).first():
                    data['follow'] = {
                        'follow':'followback'
                    }
                else:
                    print('lll')
                    data['follow'] = {
                        'follow': 'follow'
                    }
            user_serializer = UserProfileSerializer(
                friend_pro, context={"request": request})
            data['Response'] = "Success"
            data['Data'] = user_serializer.data
            data['count'] = {
                'post_count' : post_count
            }
            print(user_serializer.data['profile_pic'])
            return Response(data, status=status.HTTP_200_OK)
        else:
            data['Response'] = 'User not found'
            return Response(data, status=status.HTTP_404_NOT_FOUND)


# User Followers function.
@api_view(['GET'])
def followers_list(request):
    data = {}
    username = request.user
    id = request.user.id
    print('username', username, id)
    followers = Follower.objects.filter(username=username)
    user_followers = []
    for users in followers:
        print('ididid', users.follower.id)
        user_list = Accounts.objects.get(id=users.follower.id)
        user_followers.append(user_list)
    print('ssss', user_followers)
    followers_ser = UserProfileSerializer(
        user_followers, many=True, context={"request": request})
    data['Data'] = followers_ser.data
    data['Response'] = 'Success'
    return Response(data, status=status.HTTP_200_OK)


# User Following function.
@api_view(['GET'])
def following_list(request):
    data = {}
    id = request.user.id
    following = Follower.objects.filter(follower=id)
    user_following = []
    for users in following:
        user_list = Accounts.objects.get(username=users)
        user_following.append(user_list)
    following_ser = UserProfileSerializer(
        user_following, many=True, context={"request": request})
    data['Data'] = following_ser.data
    data['follow'] = {
        'follow': 'following'
    }
    data['Response'] = 'Succcess'
    return Response(data, status=status.HTTP_200_OK)


# To display post as feed.
class Home_view(APIView):
    # parser_classes = (MultiPartParser, FormParser)
    

    def get(self, request):
        data = {}
        username = request.user
        post_data = Post.objects.filter(is_reported=False).order_by('-id')
        user_list = []
        post_list = []
        post_liked = []
        accounts = Accounts.objects.all()
        likedpost = LikePost.objects.filter(username=username)  
        for user in accounts:
            if user.is_deactivated == False:
                user_list.append(user)
            else :
                pass               
        for post in post_data:
            if post.user in user_list:
                post_list.append(post)      
            else:
                pass    
        for post in post_list:
            for liked_p in likedpost:
                if liked_p.post_id == post.id:
                    post.is_liked
        post_ser = PostSerializer(
            post_list, many=True, context={'request': request})
        # data['Data'] = post_ser.data    
        return Response(post_ser.data, status=status.HTTP_200_OK)

    # function to upload a Post.
    def post(self, request):
        print('dataaa', request.data)
        data = {}
        user_id = request.user.id
        print('pppp')
        post_ser = PostCreateSerializer(data=request.data)
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

    # Patch method to like post model and add liked user to LikePost model.
    def patch(self, request):
        data = request.data
        print('datadatadata', data)
        id = data['id'] #id of the post.
        user = data['user'] #id of the logged in user(the one who likes the post).
        liked_user = data['liked_user'] #username of the logged in user(the one who likes the post). 
        notify_receiver = data['posteduser']  #id of the user who posted the post(this data will be used to send notifications to this user).

        post = Post.objects.get(id=id)
        likedPost = LikePost.objects.filter(
            post_id=id, username=liked_user).first()
        if likedPost == None:
            post.post_image = data.get('post_image', post.post_image)
            post.caption = data.get('caption', post.caption)
            post.likes_no = data.get('likes_no', post.likes_no)
            post.is_liked = True
            post.save()
            print('post.likes_no ', post.likes_no)
            likepost = LikePost(
                post_id=id,
                username=liked_user
            )
            likepost.save()
            try:
                accounts = Accounts.objects.get(id=user)    #getting the account instance of the loggedin user(the who like the post).
            except:
                return None    
            notify_sender = accounts #assiging the account instance to the variable notify_sender
            notify_text = f"{notify_sender} liked your post"    #text message for the notification.
            sendNotifications(notify_text,notify_sender,notify_receiver)    #passing the arguements to the sendNotification function.
        else:
            post.is_liked = False
            likedPost.delete()
            post.likes_no = post.likes_no - 1
            post.save()

        post_ser = PostSerializer(post, context={'request': request})
        return Response(post_ser.data, status=status.HTTP_200_OK)


 # To display user posts in their profiles.
class UserPostView(APIView):

    def get_object(self, user):
        try:
            user_id = Accounts.objects.get(username=user,is_deactivated=False)
            print('idd', user_id, user_id.id)
            return Post.objects.filter(user=user_id.id, is_reported = False).order_by('-id')
        except:
            return None

    def get(self, request, user):
        data = {}
        print('usernaem', user)
        post = self.get_object(user)
        if post is not None:
            post_ser = PostCreateSerializer(
                post, many=True, context={'request': request})
            data['Data'] = post_ser.data
            return Response(data, status=status.HTTP_200_OK)
        else:
            data['Response'] = 'Account does not exist'
            return Response(data, status=status.HTTP_404_NOT_FOUND)    



# Function to show single post.
class SinglePost(APIView):

    def get_object(self, id):
        try:
            return Post.objects.get(id=id)
        except Post.DoesNotExist:
            return None

    def get(self, request, id):
        print('requestrequest', request.user)
        username = request.user
        data = {}
        post = self.get_object(id)
        if post is not None:
            post_ser = PostSerializer(post, context={"request": request})
            data['Data'] = post_ser.data
            comment = Comment.objects.filter(post_id = id)    
            comment_ser = CommentSerializer(comment,many=True, context={'request': request})
            data['Comment'] = comment_ser.data
            return Response(data, status=status.HTTP_200_OK)
        else:
            print('existst')
            data['Response'] = 'No Post exists'
            return Response(data,status=status.HTTP_204_NO_CONTENT)

    #function to report post.
    def patch(self,request,id):
        data = {} 
        post = self.get_object(id)
        post.report_count   =  post.report_count + 1
        post.save()
        data['Data'] = post.report_count  
        data['Response'] = 'Reported succesfully'
        return Response(data,status=status.HTTP_200_OK) 

                
    #for deleting post
    def delete(self,request,id):
        print('delete id',id)
        data = {}
        post = self.get_object(id)
        post.delete()
        data['Response'] = 'Post deleted succesfully'
        return Response(data,status=status.HTTP_200_OK)
            

#Function to report a post.
@api_view(['PATCH'])
def report_post(request):
    data = request.data
    postid = data['post_id']
    print('post id is',postid)
    post = Post.objects.get(id = postid)
    post.report_count = data.get('report',post.report_count)
    post.save()
    post_ser = PostCreateSerializer(post,context={'request':request})

    return Response(post_ser.data)


#for creating comments under specific post.
class AddComment_View(APIView):
    permission_classes = [permissions.IsAuthenticated]


    def post(self, request):
        print('get request', request.user)
        user = request.data['user']
        print('request comment', request.data)
        notify_receiver = request.data['posteduser']
        print('notify user is',notify_receiver)
        comment_ser = CommentCreateSerializer(data=request.data, context={'request': request})
        if comment_ser.is_valid():
            comment_ser.save()
            try:
                accounts = Accounts.objects.get(id=user)
            except:
                return None
            if accounts:
                notify_sender = accounts #assiging the account instance to the variable notify_sender
                notify_text = f"{notify_sender} commented on your post"    #text message for the notification.
                sendNotifications(notify_text,notify_sender,notify_receiver)    #passing the arguements to the sendNotification function.         
            return Response(comment_ser.data, status=status.HTTP_201_CREATED)
        else:
            return Response(comment_ser.errors, status=status.HTTP_400_BAD_REQUEST)



# for viewing comments under specific post.
class ViewComment(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id, request):
        try:
            return Comment.objects.filter(post_id=id)
        except Comment.DoesNotExist:
            return Response({"Error": "Something went wrong"})

    def get(self, request, id):
        print('get request', request.user.id)
        comment = self.get_object(id,request)
        comment_ser = CommentSerializer(comment, many=True, context={"request": request})
        return Response(comment_ser.data, status=status.HTTP_200_OK) 

    #for deleting comments.
    def delete(self,request,id):
        data = {}
        print(request.user)
        try:
            comment = Comment.objects.get(id=id,user = request.user.id)
        except Comment.DoesNotExist:
            return Response({"Error":"Comment does not exist"})
        comment.delete()
        data['Response'] = 'Comment deleted succesfully'
        return Response(data, status=status.HTTP_200_OK)    



#fucntion to delete account.
@api_view(['DELETE'])
def deactivate_account(request,id):
    data = {}
    print('here is the user',request.user)
    try:
        account = Accounts.objects.get(id=id,username=request.user)
        print('lllllll',account.username)
    except:
        return Response({"Error":"Something went wrong"}) 
    if account.is_deactivated == False:    
        account.is_deactivated = True
        data['Response'] = "Account deactivated succesfully"
        account.save()
        data['active or not'] = account.is_deactivated
        return Response(data,status=status.HTTP_200_OK) 
    else:
        account.is_deactivated = False
        data['Response'] = 'Account activated succcesfully'
        account.save()
        data['active or not'] = account.is_deactivated
        return Response(data,status=status.HTTP_200_OK) 
          
        

#forgot password(implementation not completed)
@api_view(['POST'])
def forgot_password(request):
    data = {}
    email = request.data['email']
    try:
        accounts = Accounts.objects.get(email=email)
    except Accounts.DoesNotExist:
        return None
    if accounts:
        pass
    else:
        data['Errors'] = 'Invalid data'
        return Response(data, status=status.HTTP_404_NOT_FOUND)


