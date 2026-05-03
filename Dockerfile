# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
# Install dependencies
COPY package*.json ./
RUN npm ci
# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*
# Copy static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom nginx config to handle React Router and port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 for Google Cloud Run
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
