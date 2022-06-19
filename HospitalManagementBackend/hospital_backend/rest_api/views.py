from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_api.models import Hospital
from .serializers import AdminHospitalSerializer, StaffUserSerializer
from django.http import Http404, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db.models import Q
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_api.serializers import HospitalStaffUserSerializer


@csrf_exempt
def AdminHospitalSearchView(request):
    if request.method == 'POST':
        searchValue = json.loads(request.body).get(
            'searchValue', '') if len(request.body) else ''
        if searchValue == '':
            data = Hospital.objects.all().order_by('name')[:5]
        else:
            data = Hospital.objects.filter(
                Q(name__icontains=searchValue) | Q(shortCode__icontains=searchValue)).order_by('name')[:5]
        responseData = AdminHospitalSerializer(data, many=True).data
        return JsonResponse(data=responseData, safe=False)
    else:
        raise Http404


class AdminHospitalDetailsView(APIView):
    def get_object(self, pk):
        try:
            return Hospital.objects.get(pk=pk)
        except Hospital.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        snippet = self.get_object(id)
        serializer = AdminHospitalSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, id, format=None):
        snippet = self.get_object(id)
        serializer = AdminHospitalSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        snippet = self.get_object(id)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminHospitalView(APIView):

    def get(self, request):
        hospitals = Hospital.objects.all()
        serializer = AdminHospitalSerializer(hospitals, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = AdminHospitalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminHospitalStaffUserView(APIView):

    def get(self, request, id):
        try:
            hospital = Hospital.objects.get(pk=id)
        except Hospital.DoesNotExist:
            raise Http404
        domain = '@' + \
            AdminHospitalSerializer(
                hospital).data['shortCode'].lower() + '.com'
        users = User.objects.filter(
            email__endswith=domain).order_by('date_joined')[::-1]
        serializer = HospitalStaffUserSerializer(users, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class AdminStaffUserDeleteView(APIView):

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def delete(self, request, id, format=None):
        user = self.get_object(id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminStaffUserView(APIView):

    # def get(self, request):
    #     users = User.objects.all()
    #     serializer = StaffUserSerializer(users, many=True)
    #     return Response(data=serializer.data, status=status.HTTP_200_OK)

    @csrf_exempt
    def post(self, request, format=None):
        serializer = StaffUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                User.objects.create_user(
                    username=serializer.data['email'],
                    email=serializer.data['email'],
                    password=serializer.data['password'],
                    is_staff=True,
                    is_superuser=False
                )
                return Response('User Created Successfully!', status=status.HTTP_201_CREATED)
            except:
                return Response('Email ID Already In Use!', status=status.HTTP_226_IM_USED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
