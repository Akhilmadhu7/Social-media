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
        
        token = super().get_token(user)
        
        data = {}
        # Add custom claims
        token['username'] = user.username
        token['is_admin'] = user.is_admin
        accounts = Accounts.objects.get(username=user.username)
        if accounts.is_deactivated == True: 
            print(accounts.is_deactivated,'userserser',accounts.username)
            accounts.is_deactivated = False
            accounts.save()
            print(accounts.is_deactivated,'userserser',accounts.username)
        if accounts.is_verified == True:  
            token['is_verified'] = True  
            print('this is user')
            return token
        else:
            token['is_verified'] = False  
            print('username',accounts.username)
            data['Response'] = 'Account not verified'
            return token
                
        
        

    
         
        

        

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class LogoutUserView(APIView):

    def post(self,request):
        data = request.data
        print(type(data))
        print('hello')
        user = request.data['username']
        # accounts = Accounts.objects.get(username=user)
        return Response({'Response':"ok"})
        # else:
        #     return Response({'m':"went wrong"})    
       

          


@api_view(['Get'])
def get_routes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)