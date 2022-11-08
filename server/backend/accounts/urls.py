from django.urls import include, path
from . import views

urlpatterns = [
    
    path('hello',views.Hello.as_view(),name='hello'),
    path('register',views.UserRegister.as_view(),name='register'),

    path('userlist',views.Userlist.as_view(),name='userlist'),

    path('userpage',views.UserListPage.as_view(),name='userpage'),
    path('blockuser/<int:id>',views.blockUser,name='blockuser')
]