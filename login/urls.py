from django.conf.urls import url, include
from rest_framework import routers
from .views import *

urlpatterns = [
    url(r'^api/login$', LoginViewSet.as_view()),
]