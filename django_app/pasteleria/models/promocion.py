from django.db import models

class PROMOCION(models.Model):
    idPromocion = models.AutoField(primary_key=True)
    descuento = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False)  # CS7 formato 0.3
    vigencia = models.DateField(null=False, blank=False)
    
    STATUS = (
        ("ACTIVA", "Activa"),
        ("INACTIVA", "Inactiva"),   # CS6
    )
    status = models.CharField(max_length=20, choices=STATUS, null=False, blank=False, default="INACTIVA")

    def __str__(self):
        return f"Promoción {self.idPromocion}"
