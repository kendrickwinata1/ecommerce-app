import re
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Product, Review
from base.products import products
from base.serializer import ProductSerializer, UserSerializer, UserSerializerWithToken

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status


@ api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    print(query)
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@ api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    # product_detail = None
    # for product in products:
    #     if product['_id'] == pk:
    #         product_detail = product
    #         break

    return Response(serializer.data)


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # case 1_review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'details': 'You have already reviewed this product'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # case 2_no rating or 0. inform to submit rating
    elif data['rating'] == 0:
        content = {'details': 'Please select rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # case 3_create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        print(reviews)
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')
