from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from . serializers import AccountSerializer,UserProfileSerializer
from . models import Accounts
from rest_framework import permissions
from rest_framework.filters import SearchFilter




# Users search function    

class SearchPagination(PageNumberPagination):
    page_size = 5


class SearchUsers(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Accounts.objects.all()
    serializer_class = UserProfileSerializer
    # pagination_class = SearchPagination
    filter_backends = (SearchFilter,)
    search_fields = ('username','f_name','l_name')

