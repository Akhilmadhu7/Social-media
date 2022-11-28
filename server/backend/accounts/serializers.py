from rest_framework.response import Response
from rest_framework import serializers
from . models import Accounts, Follower, Post, Comment
import re


class AccountSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(
        style={'input': 'password'}, write_only=True)

    class Meta:
        model = Accounts
        fields = ['id', 'f_name', 'l_name', 'username', 'email',
                  'phone', 'password', 'password2', 'is_active', 'date_joined']

        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):

        username_exists = Accounts.objects.filter(
            username=data['username']).exists()
        email_exists = Accounts.objects.filter(email=data['email']).exists()
        phone_exists = Accounts.objects.filter(phone=data['phone']).exists()
        password = data['password']
        password2 = data['password2']

        phone_pattern = '^\d{10}$'
        phone_verify = re.match(phone_pattern, data['phone'])

        password_pattern = re.compile(r'^[a-zA-Z0-9]{8}[0-9]*[A-Za-z]*$')
        password_verify = password_pattern.search(password)
        password2_verify = password_pattern.search(password2)

        if username_exists:
            raise serializers.ValidationError(
                {'Username': 'Username has been taken already'})

        if email_exists:
            raise serializers.ValidationError(
                {'Email': 'Email has been taken already'})

        if phone_exists:
            raise serializers.ValidationError(
                {'Phone': 'Phone Number has been taken already'})

        if phone_verify is None:
            raise serializers.ValidationError({'Phone': "Not a valid number"})

        if data['f_name'] == '':
            raise serializers.ValidationError(
                {'First Name': "First name should not be empty"})

        if data['l_name'] == '':
            raise serializers.ValidationError(
                {'Last Name': 'Last name should not be empty'})

        if password_verify is None:
            raise serializers.ValidationError(
                {"Password": "Must contain 8 characters including numbers"})

        if password2_verify is None:
            raise serializers.ValidationError(
                {"Password2": "Must contain 8 characters including numbers"})

        return data

    def save(self):
        register = Accounts(
            username=self.validated_data['username'].lower(),
            email=self.validated_data['email'],
            phone=self.validated_data['phone'],
            f_name=self.validated_data['f_name'].capitalize(),
            l_name=self.validated_data['l_name'].capitalize()

        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'Password': 'Password must match'})

        register.set_password(password)
        register.save()

        return register


class UserProfileSerializer(serializers.ModelSerializer):

    profile_pic = serializers.ImageField(
        max_length=None, allow_null=True, use_url=True, required=False)
    full_name = serializers.SerializerMethodField('get_full_name')

    class Meta:
        model = Accounts
        fields = ['id', 'username', 'f_name', 'l_name', 'full_name', 'email', 'phone', 'profile_pic', 'cover_pic',
                  'birth_date', 'about', 'place', 'state', 'country', 'is_logged', 'date_joined'
                  ]

        exlcude = ['password']

    def get_full_name(self, user):
        full_name = user.f_name.capitalize() + ' ' + user.l_name.capitalize()
        return full_name

    def validate(self, data):

        email = data['email']

        # EMAIL VERIFICATION
        email_pattern = "^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{2,3}$"
        email_verify = re.match(email_pattern, email)

        if email_verify is None:
            raise serializers.ValidationError(
                {"email": "Enter valid email"})

        data['username'] = data['username'].lower()
        data['f_name'] = data['f_name'].capitalize()
        data['l_name'] = data['l_name'].capitalize()
        return data


class ChangePasswordSerializer(serializers.ModelSerializer):
    new_password = serializers.CharField(required=True)

    class Meta:
        model = Accounts
        fields = ['password', 'new_password']

    def validate(self, data):
        password = data['password']
        new_password = data['new_password']
        password_pattern = re.compile(r'^[a-zA-Z0-9]{8}[0-9]*[A-Za-z]*$')
        password_verify = password_pattern.search(new_password)

        if password == new_password:
            raise serializers.ValidationError(
                {"new_password": "New password similar to old password"})

        if password_verify is None:
            raise serializers.ValidationError(
                {"new_password": "Must contain 8 characters including numbers"})
        return data


class FollowerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Follower
        fields = '__all__'

#To show post with corresponding user details.
class PostSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only = True)
    class Meta:
        model = Post
        fields = '__all__'
    # order_by = ['-id']   
        

#To create new posts.
class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'  



class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'

    