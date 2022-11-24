from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.models import Accounts
from accounts.serializers import AccountSerializer,Post
from rest_framework.views import APIView
from rest_framework import status




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # try:
        #     if user.is_admin == True:
                print('not coming')
                print('helo',user.is_admin)
                token = super().get_token(user)

            # Add custom claims
                token['username'] = user.username
                token['is_admin'] = user.is_admin
                print(user.is_admin)
                return token
            
            # else:
            #     print("cominggggggg")
            #     pass
                # return Response({"Message":"Only admin can login "})    
        
        # except:
        #     print('raise')
            # pass
            # return Response({"Message":"Invalid credentials"})
        # return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer





class Userlist(APIView):

    def get(self, request):
        try:
            data = {}
            userlist = Accounts.objects.exclude(is_admin=True)
            user_serializer = AccountSerializer(userlist, many=True)
            data['data'] = user_serializer.data
            data['Response'] = "Success"
            return Response(data, status=status.HTTP_200_OK)
        except:
            data['Response'] = "Something went wrong"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def blockUser(request, id):

    try:
        user = Accounts.objects.get(id=id)
    except:
        return Response({"Message": "User does not exist"})
    data = {}

    if user.is_active:
        user.is_active = False
        data['Response'] = "User blocked succesfully"
    else:
        user.is_active = True
        data['Response'] = "User unblocked succesfully"
    user.save()
    return Response(data, status=status.HTTP_200_OK)


