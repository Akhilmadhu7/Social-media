from django.urls import include, path
from . import views
from . import pagination

urlpatterns = [
    
    path('hello',views.Hello.as_view(),name='hello'),
    path('register',views.UserRegister.as_view(),name='register'),

    path('userlist',views.Userlist.as_view(),name='userlist'),

    path('userpage',pagination.UserListPage.as_view(),name='userpage'),
    path('blockuser/<int:id>',views.blockUser,name='blockuser'),

    path('userprofile/<int:id>',views.UserProfile.as_view(),name='userprofile'),
    path('change-password/<int:id>',views.ChangePassword.as_view(),name='changepassword'),

    path('searchusers',pagination.SearchUsers.as_view(),name='searchusers'),

    path('new-friends',views.NewFriendsView.as_view(),name='newfriends')
]