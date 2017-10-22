from django.contrib.auth.models import User
from rest_framework import serializers

class LoginSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=False, max_length=1024)
    password = serializers.CharField(required=False, max_length=1024)

    class Meta:
        model = User
        fields = ('id', 'email', 'password')