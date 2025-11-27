from django.db import models
from .usuario import USUARIO
from .producto import PRODUCTO

class PEDIDO(models.Model):
    idPedido = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(USUARIO, on_delete=models.CASCADE, related_name="pedidos")
    fechaEntrega = models.DateField(null=False, blank=False)
    horaEntrega = models.TimeField(null=False, blank=False)
    total = models.DecimalField(max_digits=7, decimal_places=2, default=0.00)
    calificacion = models.IntegerField(null=True, blank=True, default=None)
    ENTREGA_CHOICES = (
        ("PICKUP", "pickup"),
        ("DOMICILIO", "domicilio"),
    )
    tipoEntrega = models.CharField(max_length=20, choices=ENTREGA_CHOICES,null=False, blank=False)
    FORMAPAGO_CHOICES = (
        ("MERCADOPAGO", "mercadopago"),
        ("TARJETA", "tarjeta"),
    )
    formaPago = models.CharField(max_length=20, choices= FORMAPAGO_CHOICES, null=False, blank=False)    
    STATUS = (
        ("RECIBIDO", "Pedido Recibido"),
        ("ELABORANDO", "En proceso de elaboración"),
        ("LISTO", "Listo para entrega"),
        ("ENVIADO", "Enviado"),
        ("ENTREGADO", "Entregado"),
        ("CANCELADO", "Cancelado"),  # CS1
    )
    status = models.CharField(max_length=20, choices=STATUS, null=False, blank=False, default="RECIBIDO")
    productos = models.ManyToManyField(PRODUCTO, through='DETALLE', related_name='pedidos')
    def __str__(self):
        return f"Pedido {self.idPedido} ({self.usuario.nombres})"