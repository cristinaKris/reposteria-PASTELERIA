"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from pasteleria.views import productos_tipo, crear_pastel_personalizado
from pasteleria.views import login_cliente, crear_pedido, get_extras
from pasteleria.views import get_pedidos, get_extras, crear_usuario

urlpatterns = [
    path('admin/', admin.site.urls),
    path('productos/<str:tipo>/', productos_tipo, name="productos_tipo"), 
    path('login_client/', login_cliente, name='login'),
    path('crearPedido/', crear_pedido, name ='crear_pedido'),
    path('crear_pastelP/', crear_pastel_personalizado, name  = 'crear_pastelP'),
    path('getExtras/', get_extras, name="getExtras"),
    path('get_pedidos/' , get_pedidos, name="get_pedidos"),
    path('crear_usuario/',crear_usuario, name = "crear_usuario")
]
