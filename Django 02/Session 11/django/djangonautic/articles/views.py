from django.shortcuts import render
from .models import ArticleDB

# Create your views here.
def article_list(request):

    articleVariable = ArticleDB.objects.all()
    print(articleVariable)

    return render(request, "articles/article_list.html", {"articleKey": articleVariable})

def article_detail(request, slugVariable):
    articleVariable = ArticleDB.objects.get(slug=slugVariable)
    return render(request, "articles/article_detail.html", {'articleKey': articleVariable})

