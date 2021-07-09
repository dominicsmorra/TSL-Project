
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIRequestFactory, APITestCase

from .serializers import CustomUserSerializer, PostSerializer
from .models import CustomUser, Post
from .admin import CustomUser


# Tests to create users where one has valid credentials while the other two don't
class CreateUserTestCase(APITestCase):

    def test_register_good(self):
        data = {'username': 'testingUser', 'email': 'test@email.com', 'password': 'Password123'}
        response = self.client.post('/api/user/create/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_bad(self):
        data = {'username': 'testingUser', 'email': 'test@email.com', 'password': 'pass'}
        response = self.client.post('/api/user/create/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_register_bad2(self):
        data = {'username': 'dominic', 'email': 'test@email.com', 'password': 'pass'}
        response = self.client.post('/api/user/create/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

   
# Tests to create a wall post
class CreatePostTestCase(APITestCase):

    def test_post_create(self):
        data = {'user': 'dominic', 'entry': 'Testing Entry'}
        response = self.client.post('/api/post/create/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

# Tests to retrieve the wall posts
class RetrievePostTestCase(APITestCase):

    def test_post_retrieve(self):
        response = self.client.get('/api/post/list/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# Tests if a user can login with good credentials and gets rejected with bad ones
class LoginUserTestCase(APITestCase):

    def setUp(self):
        CustomUser.objects.create_user(username='testingUser', email='email@email.com', password='password123')

    def test_user_login_good(self):
        data = {'username': 'testingUser', 'password': 'password123'}
        response = self.client.post('/api/token/obtain/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_login_bad(self):
        data = {'username': 'testingUser', 'password': 'password124'}
        response = self.client.post('/api/token/obtain/', data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

# Tests if a user can be created then logged in with
class CreateUserThenLoginTestCase(APITestCase):

    def test_user(self):
        data = {'username': 'testingUser', 'email': 'test@email.com', 'password': 'Password123'}
        response = self.client.post('/api/user/create/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data = {'username': 'testingUser', 'password': 'Password123'}
        response = self.client.post('/api/token/obtain/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# Tests if a user can login then logout using their JWT refresh token
class LoginUserThenLogoutTestCase(APITestCase):

    def setUp(self):
        CustomUser.objects.create_user(username='testingUser', email='email@email.com', password='password123')

    def test_user(self):
        data = {'username': 'testingUser', 'password': 'password123'}
        response = self.client.post('/api/token/obtain/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = {'refresh_token': response.data['refresh']}
        response = self.client.post('/api/blacklist/', data)
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)


