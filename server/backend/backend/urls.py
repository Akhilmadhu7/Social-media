
from django.contrib import admin
from django.urls import include, path
from . import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('accounts.api.urls')),
    path('accounts/',include('accounts.urls')),
    path('myadmin/',include('myadmin.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
