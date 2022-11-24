from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from accounts.serializers import AccountSerializer,PostSerializer
from accounts.models import Accounts,Post
from rest_framework import permissions




# Admin side users display with pagination

class UserPagination(PageNumberPagination):
    page_size = 7

class UserListPage(ListAPIView):
    # permission_classes = [permissions.IsAdminUser]
    queryset = Accounts.objects.exclude(is_admin = True)   
    serializer_class = AccountSerializer 
    pagination_class = UserPagination 


class UserPostPagination(PageNumberPagination):
    page_size = 7


class UserPostView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = UserPostPagination
