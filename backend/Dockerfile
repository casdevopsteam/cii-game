# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production Runtime
FROM node:22-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Add graphics dependencies for PDFKit generation
RUN apk add --no-cache fontconfig ttf-dejavu

# Security: Run as non-root user
RUN addgroup -S nodejs && adduser -S nodeapp -G nodejs

# CRITICAL SECURITY RULE: Chown the directory before switching user
RUN chown -R nodeapp:nodejs .

USER nodeapp

# Note: App writes files strictly relative to process.cwd()
EXPOSE 5000

CMD ["node", "dist/index.js"]
