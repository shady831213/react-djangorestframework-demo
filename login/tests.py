from rest_framework.test import APITestCase
from rest_framework import status,urls
from django.contrib.auth.models import User
import yaml
# Create your tests here.
class LoginTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user('test', 'test@test.com', 'password123')


    def setUp(self):
        self.url = '/login/api/login'
        self.data = {'email': self.user.email, 'password':'password123'}
        self.tokens = self.getTokenPair()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer '+self.tokens['access'])

    #helper function
    def getResponse(self, data):
        return self.client.post(self.url, data, format='json')

    def getTokenPair(self):
        response = self.client.post('/api/token/',{'username': self.user.username, 'password':'password123'},format='json')
        return response.data


    def refreshToken(self):
        response = self.client.post('/api/token/refresh/',{'refresh': self.tokens['refresh']},format='json')
        return response.data

    def test_login(self):
        """
        correct login.
        """
        response = self.getResponse(self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.data,{'email': self.user.email, 'id':1})

    def test_emailError(self):
        """
        emailError.
        """
        response = self.getResponse({'email': 'error@error.com', 'password': 'password123'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_passwordError(self):
        """
        passwordError
        """
        response = self.getResponse({'email': 'error@error.com', 'password': 'password121'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_routeError(self):
        """
        passwordError
        """
        response = self.client.post('/login/api', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_wronge_token(self):
        """
        wrong token
        """
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.tokens['refresh'])
        response = self.getResponse(self.data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_refresh_token(self):
        """
        refresh token
        """
        self.tokens['access'] = self.refreshToken()
        response = self.getResponse(self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.data,{'email': self.user.email, 'id':1})