from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        try:
            if user.is_admin == True:
                print('not coming')
                print('helo',user.is_admin)
                token = super().get_token(user)

            # Add custom claims
                token['username'] = user.username
                token['is_admin'] = user.is_admin
                print(user.is_admin)
                return token
            
            else:
                print("cominggggggg")
                return Response({"Message":"Only admin can lgin"})
                # return Response({"Message":"Only admin can login "})    
        
        except:
            raise AttributeError({"Message":"Invalid credentials"})
        # return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer