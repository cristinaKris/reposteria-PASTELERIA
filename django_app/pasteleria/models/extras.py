from django.db import models

class EXTRA(models.Model):
    idExtra = models.AutoField(primary_key=True)
    nombreExtra = models.CharField(max_length=50, null=False, blank=False, unique=True)

    TIPOS_EXTRA = (
        ("DECORACION", "cobertura"),
        ("SABOR", "sabor"),
        ("RELLENO", "relleno"),
        ("TAMANO", "tamano")
    )
    tipoExtra = models.CharField(max_length=50, null=False, blank=False, choices=TIPOS_EXTRA)
    price = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)

    def __str__(self):
        return f"Extra ({self.nombreExtra})"
    