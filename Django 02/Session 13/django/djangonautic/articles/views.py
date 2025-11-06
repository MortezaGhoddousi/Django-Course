from django.shortcuts import render, redirect
from .models import ArticleDB
from django.contrib.auth.decorators import login_required
from .forms import CreateArticle

# Create your views here.
def article_list(request):

    articleVariable = ArticleDB.objects.all()
    print(articleVariable)

    return render(request, "articles/article_list.html", {"articleKey": articleVariable})

def article_detail(request, slugVariable):
    articleVariable = ArticleDB.objects.get(slug=slugVariable)
    return render(request, "articles/article_detail.html", {'articleKey': articleVariable})

@login_required(login_url='/accounts/login/')
def article_create(request):
    if request.method == "POST":
        form = CreateArticle(request.POST, request.FILES)
        if form.is_valid():
            # save data into articleDB
            instance = form.save(commit=False)
            instance.author = request.user
            instance.save()
            return redirect('articleAppName:list')
        else:
            return render(request, "articles/article_create.html", {'formKey': form})
    else:
        form = CreateArticle()
        return render(request, "articles/article_create.html", {'formKey': form})

