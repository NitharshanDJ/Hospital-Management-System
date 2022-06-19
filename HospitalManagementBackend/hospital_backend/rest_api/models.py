from django.db import models


class Hospital(models.Model):
    name = models.CharField(name="name", max_length=100, null=False)
    address = models.CharField(name='address', max_length=150, null=False)
    total_beds = models.IntegerField(name='totalBeds', null=False)
    short_code = models.CharField(name='shortCode', unique=True, max_length=3)

    def __str__(self):
        return self.name[:20]


class Patient(models.Model):
    patient_id = models.CharField(name='patientId', max_length=13)
    first_name = models.CharField(name="firstName", max_length=30, null=False)
    last_name = models.CharField(name="lastName", max_length=30, null=False)
    age = models.PositiveIntegerField(name="age", null=False)
    dob = models.DateField(
        name="dateOfBirth", auto_now=False, auto_now_add=False)
    height = models.DecimalField(
        name='height', null=False, decimal_places=3, max_digits=8)
    weight = models.DecimalField(
        name='weight', null=False,  decimal_places=3, max_digits=8)
    address = models.TextField(name='address', max_length=150, null=False)
    blood_group = models.CharField(name='bloodGroup', max_length=5, null=False)
    aadhar_card = models.CharField(name='aadharCard', max_length=12)
    hospital = models.ForeignKey(to=Hospital, on_delete=models.CASCADE)
    # admit_date = models.DateField(name='admissionDate', auto_now=True, auto_now_add=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name
