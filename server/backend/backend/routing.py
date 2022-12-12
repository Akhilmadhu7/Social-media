


import backend.routing


from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter,URLRouter



application = ProtocolTypeRouter({
    'websocket':AuthMiddlewareStack(
        URLRouter(
            backend.routing.websocket_urlpatterns
        )
    )
})