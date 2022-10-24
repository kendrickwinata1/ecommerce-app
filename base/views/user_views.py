from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Product
from base.products import products
from base.serializer import ProductSerializer, UserSerializer, UserSerializerWithToken

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['message'] = 'Hello World'
        # ...

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # data["username"] = self.user.username
        # data["email"] = self.user.email
        # data["password"] = self.user.password

        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    print('DATA:', data)

    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']))

        # django signals combine senders and receiver.

        serializer = UserSerializerWithToken(user, many=False)
        print(serializer.data)
        return Response(serializer.data)

    except:
        message = {'detail': " User with this email already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['PUT'])
@ permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    # give authenticated user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    # give authenticated user
    serializer = UserSerializer(user, many=False)
    print(serializer.data)
    return Response(serializer.data)


@ api_view(['GET'])
@ permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
