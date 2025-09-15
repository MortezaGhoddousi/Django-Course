from rest_framework import serializers
from .models import UserEmp

class UserEmpSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEmp
        fields = ['email', 'password', 'image', 'title']
