from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

import json
from .models import PRODUCTO,PAN, TARTA, POSTRE, PASTEL, PASTEL_ESTABLECIDO, PASTEL_PERSONALIZADO
from .models import USUARIO
from .models import DETALLE, PEDIDO
from .models import EXTRA

TIPOS = {
     "PAN": PAN,
    "TARTA": TARTA,
    "POSTRE": POSTRE,
    "PASTEL": PASTEL,
}

TIPOS_EXTRA = {
    "DECORACION",
    "RELLENO",
    "SABOR",
    "TAMANO"
}

def productos_tipo(request, tipo):
    tipo = tipo.upper()

    if tipo not in TIPOS:
        return JsonResponse({"error": "Tipo no válido"}, status=400)

    productos = PRODUCTO.objects.filter(tipo__iexact=tipo)

    data = []
    for p in productos:
        item = {
            "id": p.idProducto,
            "stock": p.stock,
            "precio": p.precioUnitario,
            # "precio_desc": float(p.aplicarPromocion()),
                        
            "tipo": p.tipo,
            "descripcion": None,
            "nombre": None,
            "img": None,
        }

        if p.tipo.upper() == "PAN" and hasattr(p, "pan"):
            pan = p.pan
            item["descripcion"] = pan.descripcion
            item["nombre"] = pan.nombrePan
            item["img"] = pan.imagen

        if p.tipo.upper() == "TARTA" and hasattr(p, "tarta"):
            producto = p.tarta
            item["descripcion"] = producto.descripcion
            item["nombre"] = producto.nombreTarta
            item["img"] = producto.imagen

        if p.tipo.upper() == "POSTRE" and hasattr(p, "postre"):
            producto = p.postre
            item["descripcion"] = producto.descripcion
            item["nombre"] = producto.nombrePostre
            item["img"] = producto.imagen

        if p.tipo.upper() == "PASTEL" and hasattr(p, "pastel"):
            pa = p.pastel

            if hasattr(pa, "pastelestablecido"):
                producto = pa.pastelestablecido
                    

        data.append(item)

    return JsonResponse({"Productos": data})

@csrf_exempt
@require_http_methods(["POST"])
def login_cliente(request):
    data = json.loads(request.body)
    
    correo = data.get('correo')
    password = data.get('password')
    
    usuario = USUARIO.objects.filter(correo=correo, contraseña=password).first()

    
    if usuario:
        return JsonResponse({
            'success': True,
            'message': 'Login exitoso',
            'usuario': {
                'id': usuario.idUsuario,
                'nombre': usuario.nombres,
                'apellidoP': usuario.apellidoP,
                'apellidoM': usuario.apellidoM,
                'correo': usuario.correo,
                'edad': usuario.edad,
                'saldoEqui': usuario.saldoEqui,
               'puntosReco': usuario.puntosReco
            }
        })
    else:
        return JsonResponse({'success': False, 'message': 'Credenciales incorrectas'}, status=401)
    
    
@csrf_exempt
def crear_pedido(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        usuario_id = data.get('usuario')  
        
        try:
            usuario = USUARIO.objects.get(idUsuario = usuario_id)
        except USUARIO.DoesNotExist:
            return JsonResponse({"error": "Usuario no existe"}, status=404)
        
        pedido = PEDIDO.objects.create(
            usuario=usuario,
            fechaEntrega=data.get('fechaEntrega', None),
            horaEntrega=data.get('horaEntrega', None),
            total=data.get('total', 0),
            tipoEntrega=data.get('tipoEntrega', 'PICKUP'),
            formaPago=data.get('formaPago', 'MERCADOPAGO'),
            status=data.get('status', 'RECIBIDO'),
        )
        
        productos = data.get('productos', [])
        for item in productos:
            try:
                producto = PRODUCTO.objects.get(idProducto=item['id'], tipo=item['tipo'])
                DETALLE.objects.create(
                    pedido=pedido,
                    producto=producto,
                    cantidad=item.get('cantidad', 1),
                )
            except PRODUCTO.DoesNotExist:
                continue  # o manejar error
        
        return JsonResponse({"idPedido": pedido.idPedido}, status=201)
    else:
        return JsonResponse({"idPedido": pedido.idPedido}, status=500)

    
@csrf_exempt
def crear_pastel_personalizado(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
    try:
        data = json.loads(request.body)

        producto = PRODUCTO.objects.create(
            stock=data.get('stock', 1),
            precioUnitario=data.get('precio', 0),
            tipo="PASTEL"
        )

        pastel = PASTEL.objects.create(
            idPastel=producto,
            tipoPastel="PERSONALIZADO"
        )

        pastel_personalizado = PASTEL_PERSONALIZADO.objects.create(
            idPersonalizado=pastel
        )


        extras_ids = data.get('extras', [])  # [1,2,3]
        if extras_ids:
            extras_objs = EXTRA.objects.filter(idExtra__in=extras_ids)
            pastel_personalizado.extras.set(extras_objs) 

        pastel_personalizado.save()



        return JsonResponse({
            "id" : producto.idProducto,
            "success": True,
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    


@csrf_exempt
def get_extras(request):
    if request.method != 'GET':
        return JsonResponse({"error": "Método no permitido"}, status=405)

    resultado = {}
    for t in TIPOS_EXTRA:
        extras = EXTRA.objects.filter(tipoExtra=t)
        extras_list = [{"id": e.id, "nombre": e.nombre, "precio": float(e.precio)} for e in extras]
        resultado[t] = extras_list

    return JsonResponse(resultado, safe=False)


@csrf_exempt
def get_pedidos(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
    try:
        data = json.loads(request.body)
        id_usuario = data.get("idUsuario")
        if not id_usuario:
            return JsonResponse({"error": "idUsuario no proporcionado"}, status=400)
        
        pedidos = PEDIDO.objects.filter(usuario_id=id_usuario)
        pedidos_list = [{
            "idPedido": p.idPedido,
            "fechaEntrega": p.fechaEntrega.strftime("%Y-%m-%d"),
            "horaEntrega": p.horaEntrega.strftime("%H:%M:%S"),
            "total": float(p.total),
            "calificacion": p.calificacion
        } for p in pedidos]
        
        return JsonResponse({"pedidos": pedidos_list}, safe=False)
    
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido"}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def crear_usuario(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"success": False, "message": "JSON inválido"}, status=400)

    # Datos exactamente como Angular los envía
    nombre = data.get('nombres')
    apellidoP = data.get('apellidoP')
    apellidoM = data.get('apellidoM', '')
    correo = data.get('correo')
    celular = data.get('celular')
    fecha_nacimiento = data.get('fechaN')
    direccion_entrega = data.get('direccionEntrega')
    username = data.get('nombreU')
    password = data.get('password')

    # Validaciones básicas
    if not all([nombre, apellidoP, correo, password, celular, fecha_nacimiento, username]):
        return JsonResponse({"success": False, "message": "Faltan campos obligatorios"}, status=400)

    # Validar correo duplicado
    if USUARIO.objects.filter(correo=correo).exists():
        return JsonResponse({"success": False, "message": "El correo ya está registrado"}, status=400)

    # Validar username duplicado
    if USUARIO.objects.filter(nombreU=username).exists():
        return JsonResponse({"success": False, "message": "El usuario ya existe"}, status=400)

    # Convertir fecha
    try:
        fecha_nacimiento_date = datetime.strptime(fecha_nacimiento, "%Y-%m-%d").date()
    except ValueError:
        return JsonResponse({"success": False, "message": "Formato de fecha inválido, use YYYY-MM-DD"}, status=400)

    # Crear usuario
    usuario = USUARIO.objects.create(
        correo=correo,
        nombreU=username,
        contraseña=make_password(password),
        nombres=nombre,
        apellidoP=apellidoP,
        apellidoM=apellidoM,
        direccionEntrega=direccion_entrega,
        celular=celular,
        fechaNacimiento=fecha_nacimiento_date,
        saldoEqui=data.get('saldoEqui', 0),
        puntosReco=data.get('puntosReco', 0),
    )

    return JsonResponse({
        "success": True,
        "message": "Usuario creado correctamente",
        "usuario": {
            "id": usuario.idUsuario,
            "nombre": usuario.nombres,
            "apellidoP": usuario.apellidoP,
            "apellidoM": usuario.apellidoM,
            "username": usuario.nombreU,
            "correo": usuario.correo,
            "saldoEqui": usuario.saldoEqui,
            "puntosReco": usuario.puntosReco
        }
    }, status=201)
