FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build Angular (SPA)
RUN npm run build -- --configuration=production

# Copia el build final al directorio de salida
CMD ["sh", "-c", "cp -r dist/pasteleria/browser/* /out"]
