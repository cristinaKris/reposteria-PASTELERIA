#!/bin/sh

echo "Esperando a PostgreSQL..."
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "PostgreSQL listo."

echo "Generando migraciones..."
python manage.py makemigrations --noinput

echo "Aplicando migraciones..."
python manage.py migrate --noinput

echo "Levantando servidor Django..."
python manage.py runserver 0.0.0.0:8000