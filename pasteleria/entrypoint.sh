#!/bin/sh
set -e

echo "=========== Build Angular ==============="

npm run build -- --configuration production --browser || {
    echo "❌ Error compilando Angular"
    exit 1
}

echo "=========== Build completado ==========="

