from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.models import Accounts
from accounts.serializers import UserProfileSerializer




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # if user.is_active==True:
        # print('not coming')
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_admin'] = user.is_admin
        accounts = Accounts.objects.get(username=user.username)
        if not accounts.is_logged:
            print('loooooooogged',accounts.is_logged)
            accounts.is_logged = True
            accounts.save()
            print('loggeeeeeeed',accounts.is_logged)
            token['is_logged'] = user.is_logged
        else:
            print('lllllogged',accounts.is_logged)
            accounts.is_logged = True
            accounts.save()
            print('loggggggggged',accounts.is_logged)
            token['is_logged'] = user.is_logged

    
        # ...
        # else:
        #     print("cominggggggg")
        #     pass    
        

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class LogoutUserView(APIView):

    def post(self,request):
        data = request.data
        print(type(data))
        print('hello')
        user = request.data['username']
        accounts = Accounts.objects.get(username=user)
        if accounts.is_logged:
            print('ll',accounts.is_logged)
            accounts.is_logged=False
            accounts.save()
            print('ssss',accounts.is_logged)
            return Response({'Response':"ok"})
        else:
            return Response({'m':"went wrong"})    
       

          


@api_view(['Get'])
def get_routes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)