#coding:utf-8
from rest_framework import generics, viewsets, mixins, status, permissions, authentication
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *


class LoginViewSet(APIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer

    def post(self, request):
        print(request)
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            user = User.objects.get(email__iexact=email)
            if user.check_password(password):
                print (user)
                serializer = LoginSerializer({'id': user.id, 'email': user.email})
                return Response(serializer.data)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)