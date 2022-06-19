from django.urls import path
from .views import AdminHospitalView, AdminHospitalDetailsView, AdminHospitalSearchView, AdminStaffUserView
from rest_api.views import AdminHospitalStaffUserView, AdminStaffUserDeleteView


urlpatterns = [
    path('admin/hospitals/', AdminHospitalView.as_view()),
    path('admin/hospitals/search/', AdminHospitalSearchView),
    path('admin/hospital/<int:id>', AdminHospitalDetailsView.as_view()),
    path('admin/hospital/<int:id>/superuser/',
         AdminHospitalStaffUserView.as_view()),
    path('admin/staffuser/', AdminStaffUserView.as_view()),
    path('admin/staffuser/<int:id>', AdminStaffUserDeleteView.as_view()),
]
