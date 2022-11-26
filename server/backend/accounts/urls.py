from django.urls import include, path
from . import views
from . import pagination

urlpatterns = [
    
    path('hello',views.Hello.as_view(),name='hello'),
    # path('logoutuser',views.LogoutUserView.as_view(),name='logout user'),
    path('register',views.UserRegister.as_view(),name='register'),

    path('userprofile/<int:id>',views.UserProfile.as_view(),name='userprofile'),
    path('change-password',views.ChangePassword.as_view(),name='changepassword'),

    path('searchusers',pagination.SearchUsers.as_view(),name='searchusers'),

    path('new-friends',views.NewFriendsView.as_view(),name='newfriends'),
    path('follow',views.FollowUsers.as_view(),name='followuser'),

    path('friends-profile/<str:user>',views.FriendsProfileView.as_view(),name='freinds-profile'),

    path('followers',views.followers_list,name='followers'),
    path('following',views.following_list,name='following'),

    # path('posts/<int:id>',views.Post_view.as_view(),name='posts'),
    path('home',views.Home_view.as_view(),name='home'),

    #url for viewing , creating and like post.
    path('userpost/<str:user>',views.UserPostView.as_view(),name='userpost'),
    path('singlepost/<int:id>',views.SinglePost.as_view(),name='singlepost'),

    path('comment',views.Comment_View.as_view(),name='comment')

]