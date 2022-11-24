from django.urls import path
from . import views
from . import pagination
from . views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
   
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('userlist',views.Userlist.as_view(),name='userlist'),

    path('userpage',pagination.UserListPage.as_view(),name='userpage'),
    path('blockuser/<int:id>',views.blockUser,name='blockuser'),

    path('listpost',pagination.UserPostView.as_view(),name='listpost')
]