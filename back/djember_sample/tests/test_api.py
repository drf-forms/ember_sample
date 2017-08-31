from .factories import UserFactory
from .base import BaseAPITestCase

from django.contrib.auth import get_user_model

from rest_framework.test import APITestCase

from ..serializers import UserSerializer


class UserAPITest(BaseAPITestCase, APITestCase):

  api_base_name = 'user'
  model = get_user_model()
  model_factory_class = UserFactory
  serializer_class = UserSerializer
