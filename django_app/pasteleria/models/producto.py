from django.db import models
from .promocion import PROMOCION

class PRODUCTO(models.Model):
    TIPO_CHOICES = (
        ("PASTEL", "pastel"),
        ("TARTA", "tarta"),
        ("POSTRE", "postre"),
        ("PAN", "pan"),
    )

    idProducto = models.AutoField(primary_key=True)
    stock = models.IntegerField(default=0)
    precioUnitario = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)

    # ← GENERALIZACIÓN: tipo de producto, no más tablas
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES, null=False, blank=False)

    promocion = models.ManyToManyField(
    PROMOCION,
    blank=True,
    related_name="producto",
    )


    @property
    def disponible(self):
        return self.stock > 0

    def aplicarPromocion(self):
        promo = self.promocion
        if promo is None:
            return self.precioUnitario
        if promo.status == "ACTIVA":
            return self.precioUnitario * (1 - promo.descuento)
        return self.precioUnitario

    def __str__(self):
        return f"({self.idProducto}) - {self.tipo}"
