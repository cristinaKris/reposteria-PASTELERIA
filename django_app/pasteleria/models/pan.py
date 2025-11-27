from django.db import models
from .producto import PRODUCTO
class PAN(models.Model):
    idPan = models.OneToOneField(
        PRODUCTO,
        on_delete=models.CASCADE,
        primary_key=True,
        limit_choices_to={"tipo": "PAN"},  # opcional pero ayuda
    )
    nombrePan = models.CharField(max_length=50, null=True, blank=True, unique=True)
    descripcion = models.CharField(max_length=255, null=True, blank=True, default="Sin descripción")
    imagen = models.CharField(max_length=255, null=True, blank=True, default="Sin imagen")
    def __str__(self):
        return f"Pan ({self.idPan})"