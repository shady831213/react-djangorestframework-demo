from django.shortcuts import render

# Create your views here.
def render_html(request):
    return render(request, 'index.html')