from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from . serializers import AccountSerializer,UserProfileSerializer
from . models import Accounts
from rest_framework import permissions
from rest_framework.filters import SearchFilter


# Admin side users display with pagination

class UserPagination(PageNumberPagination):
    page_size = 7

class UserListPage(ListAPIView):
    # permission_classes = [permissions.IsAdminUser]
    queryset = Accounts.objects.exclude(is_admin = True)   
    serializer_class = AccountSerializer 
    pagination_class = UserPagination 


# Users search function    

class SearchPagination(PageNumberPagination):
    page_size = 5


class SearchUsers(ListAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Accounts.objects.all()
    serializer_class = UserProfileSerializer
    # pagination_class = SearchPagination
    filter_backends = (SearchFilter,)
    search_fields = ('username','f_name','l_name')

