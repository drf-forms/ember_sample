from django.urls import include, path
from drf_auto_endpoint.router import router

from .views import UserViewSet


router.registerViewSet(r'userinfos', UserViewSet)

urlpatterns = [
    path(r'', include(router.urls)),
]
