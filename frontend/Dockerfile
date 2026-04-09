# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Directorio para certificados CA (se montan como volumen o secret en Railway)
RUN mkdir -p /etc/nginx/certs

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
