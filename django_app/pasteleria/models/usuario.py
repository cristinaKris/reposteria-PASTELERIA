from django.db import models
from datetime import date

class USUARIO(models.Model):
    idUsuario = models.AutoField(primary_key=True)

    correo = models.EmailField(max_length=255, unique=True, null=False, blank=False)
    nombreU = models.CharField(max_length=100, null=False, blank=False, unique=True)
    contraseña = models.CharField(max_length=255, null=False, blank=False)

    nombres = models.CharField(max_length=120, null=False, blank=False)
    apellidoP = models.CharField(max_length=60, null=False, blank=False)
    apellidoM = models.CharField(max_length=60, null=True, blank=True)

    direccionEntrega = models.CharField(null=True, blank=True, max_length=35, default="Sin dirección")

    fechaN = models.DateField(null=False, blank=False)
    celular = models.CharField(max_length=20, null=False, blank=False)

    puntosReco = models.IntegerField(default=0)

    @property
    def edad(self):
        hoy = date.today()
        return hoy.year - self.fechaN.year - (
            (hoy.month, hoy.day) < (self.fechaN.month, self.fechaN.day)
        )
    @property
    def saldoEqui(self):
        return self.puntosReco/100

    def __str__(self):
        return f"{self.nombres} {self.apellidoP}"