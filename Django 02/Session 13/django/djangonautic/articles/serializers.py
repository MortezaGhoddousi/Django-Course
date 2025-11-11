from .models import ArticleDB
from rest_framework import serializers

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleDB
        fields = '__all__'