# Stage 1: Build React SPA
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx (This acts as the Main Reverse Proxy)
FROM nginx:alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Note: The main /etc/nginx/nginx.conf is NOT deleted here. 
# It will be overwritten via a volume mount in docker-compose.yml 
# containing the highly secured configuration.

# Test Nginx configuration on container start
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD nginx -t || exit 1

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
