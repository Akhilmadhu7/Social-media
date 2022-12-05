from django.urls import include, path
from . import views
from . import pagination

urlpatterns = [
    
    path('hello',views.Hello.as_view(),name='hello'),
    
    #url for create a new account.
    path('register',views.UserRegister.as_view(),name='register'),

    #user profile url
    path('userprofile/<int:id>',views.UserProfile.as_view(),name='userprofile'),
    path('change-password',views.ChangePassword.as_view(),name='changepassword'),

    #url for search users.
    path('searchusers',pagination.SearchUsers.as_view(),name='searchusers'),

    #list friend suggestion url.
    path('new-friends',views.NewFriendsView.as_view(),name='newfriends'),

    #follow profiles url.
    path('follow',views.FollowUsers.as_view(),name='followuser'),

    #view friends profile url
    path('friends-profile/<str:user>',views.FriendsProfileView.as_view(),name='freinds-profile'),

    #url for listing all the followers and people who has been followed by the loggedin user.
    path('followers',views.followers_list,name='followers'),
    path('following',views.following_list,name='following'),

    # path('posts/<int:id>',views.Post_view.as_view(),name='posts'),

    #url for list all the post uploaded by users,upload post, and like post.
    path('home',views.Home_view.as_view(),name='home'),

    #url for viewing all the post uploaded by user in profile.
    path('userpost/<str:user>',views.UserPostView.as_view(),name='userpost'),

    #url for viewing post seperately  and for reporting.
    path('singlepost/<int:id>',views.SinglePost.as_view(),name='singlepost'),
    # path('report-post',views.report_post,name='report-post'),

    #url for creating comment under post.
    path('comment',views.AddComment_View.as_view(),name='comment'),

    #url for show and delete comments.
    path('show/<int:id>',views.ViewComment.as_view(),name='comment'),

    #deactivate account url
    path('deactivate-account/<int:id>',views.deactivate_account,name='deactivate-account')

]