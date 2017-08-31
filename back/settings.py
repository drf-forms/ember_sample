"""
Django settings for djember_sample project.

https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

try:
    from environ import *
except ImportError:
    raise Exception('Improperly configured: Please make an untracked copy of '
                    'environ.py.dist to environ.py and update with your '
                    'actual settings')

# Application definition

INSTALLED_APPS = (
    'djember_sample',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # DRF
    'rest_framework',
    'django_filters',
    'corsheaders',

    # Djember
    'drf_auto_endpoint',
    'export_app',
    'levit_report',

    # Celery
    #'kombu.transport.django.KombuAppConfig',

    # My applications
    'crm',

    # Tests
    # 'factory',
    # 'django_jenkins',
)

MIDDLEWARE = (
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
)

ROOT_URLCONF = 'urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'loaders': (
                'django.template.loaders.app_directories.Loader',
            ),
        },
    },
]

WSGI_APPLICATION = 'djember_sample.wsgi.application'


# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)

MEDIA_URL = '/uploads/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'uploads')
STATIC_URL = '/assets/'
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
STATIC_ROOT = os.path.join(BASE_DIR, 'assets')

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 200,
    'DEFAULT_METADATA_CLASS': 'drf_auto_endpoint.metadata.MinimalAutoMetadata',
}
DRF_AUTO_METADATA_ADAPTER = 'drf_auto_endpoint.adapters.EmberAdapter'
DRF_AUTO_BASE_SERIALIZER = 'drf_base64.serializers.ModelSerializer'
DRF_AUTO_BASE_VIEWSET = 'djember_sample.views.ModelViewSet'
DRF_AUTO_BASE_READONLY_VIEWSET = 'djember_sample.views.ReadOnlyModelViewSet'

BROKER_URL = 'django://'
CELERY_RESULT_BACKEND = 'djcelery.backends.database:DatabaseBackend'
DRF_AUTO_WIDGET_MAPPING = {
        'Base64FileField': 'file',
        'Base64ImageField': 'image',

}

EXPORTER_ADAPTER = 'export_app.adapters.EmberAdapter'
EXPORTER_ROUTER_PATH = 'djember_sample.api_urls.router'
EXPORTER_FRONT_APPLICATION_NAME = 'djember-sample'

if DEBUG:
    INSTALLED_APPS += (
        'debug_toolbar',
    )

    MIDDLEWARE += (
        'debug_toolbar.middleware.DebugToolbarMiddleware',
    )

CORS_ORIGIN_ALLOW_ALL = DEBUG

# Apps Jenkins needs to run tests on
PROJECT_APPS = [
    'djember_sample',
]
