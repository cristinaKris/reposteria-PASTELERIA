from django.db import models
from .pedido import PEDIDO
from .producto import PRODUCTO


class DETALLE(models.Model):
    pedido = models.ForeignKey(PEDIDO, on_delete=models.CASCADE, related_name="detalles")
    producto = models.ForeignKey(PRODUCTO, on_delete=models.CASCADE, related_name="detalles")
    cantidad = models.IntegerField(null=False, blank=False)

    class Meta:
        unique_together = ['pedido', 'producto']  # Esto asegura que no haya duplicados de productos en un mismo pedido
        # O puedes usar `constraints` si prefieres una forma más moderna de hacerlo (en Django 2.2+)
        constraints = [
            models.UniqueConstraint(fields=['pedido', 'producto'], name='unique_pedido_producto')
        ]
    @property
    def subtotal(self):  # CS5
        return self.producto.precioUnitario * self.cantidad

    def __str__(self):
        return f"Item ({self.pedido} - {self.producto.tipo})"
