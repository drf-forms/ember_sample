from django.contrib.auth import get_user_model, authenticate

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name'
        )


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        try:
            user = authenticate(username=data['username'], password=data['password'])
            if user and user.is_active:
                data['user'] = user
                return data
        except get_user_model().DoesNotExist:
            pass
        raise serializers.ValidationError('Wrong username or password')

