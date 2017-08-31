from factory import fuzzy, PostGenerationMethodCall, lazy_attribute
from factory.django import DjangoModelFactory

from django.conf import settings


class UserFactory(DjangoModelFactory):

    class Meta:
        model = settings.AUTH_USER_MODEL

    username = fuzzy.FuzzyText()
    first_name = fuzzy.FuzzyText()
    last_name = fuzzy.FuzzyText()
    password = PostGenerationMethodCall('set_password', 'changeM3')
    is_active = True
    is_staff = False
    is_superuser = False

    @lazy_attribute
    def email(self):
        return '{}@example.com'.format(self.username)


def get_admin(username=None):
    from django.contrib.auth import get_user_model

    kwargs = {
        'is_superuser': True,
        'is_staff': True
    }

    if username is not None:
        kwargs['username'] = username

    users = get_user_model().objects.filter(**kwargs)
    if users.count() > 0:
        return users[0]

    rv = UserFactory(**kwargs)
    rv.save()

    return rv

