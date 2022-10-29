from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('orders/myorders/', views.getMyOrders, name='myorders'),
    path('orders/add/', views.addOrderItems, name='orders-add'),
    path('orders/<str:pk>/', views.getOrderById, name='user-order'),
    path('orders/<str:pk>/pay/', views.updateOrderToPaid, name='pay')
]
