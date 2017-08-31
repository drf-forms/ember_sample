from django.urls import path, re_path, include
from django.contrib import admin
from django.conf import settings

from rest_framework import urls as drf_urls

from levit_report import urls as report_urls

from djember_sample import api_urls
from djember_sample.views import (EmberView, MeView, LoginView, LogoutView,
                                                service_worker_view, root_files_view)

from export_app import urls as export_app_urls, settings as export_app_settings


urlpatterns = []

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns = [
        re_path(r'(?P<filetype>(service-worker|sw-toolbox))(?P<buildhash>(-\w*)?)\.js$', service_worker_view),
        re_path(r'^(?P<filename>(crossdomain\.xml|manifest\.appcache|robots\.txt))$', root_files_view),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    # Examples:
    # url(r'^$', '.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    path('admin/', admin.site.urls),
    path('api/v1/', include(api_urls)),
    path('api-auth/', include(drf_urls)),
    path('api/auth/login/', LoginView.as_view()),
    path('api/auth/logout/', LogoutView.as_view()),
    path('api/auth/me/', MeView.as_view()),
    path('models/', include(export_app_urls, namespace=export_app_settings.URL_NAMESPACE)),
    path('reports/', include(report_urls)),

    re_path(r'', EmberView.as_view(template_name='index.html'), name='ember'),
]
