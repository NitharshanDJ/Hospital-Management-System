from rest_framework.serializers import ModelSerializer
from .models import Hospital
from django.contrib.auth import get_user_model


class AdminHospitalSerializer(ModelSerializer):
    class Meta:
        model = Hospital
        fields = '__all__'
        # fields = ['name']


class HospitalStaffUserSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'email']


class StaffUserSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'password']
