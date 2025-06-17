# Etapa de build de Angular
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production

# 🔍 Paso de verificación opcional (puedes quitarlo luego)
RUN ls -la /app/dist && ls -la /app/dist/tweeter

# Etapa final: servir con NGINX
FROM nginx:alpine
COPY --from=builder /app/dist/tweeter /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
