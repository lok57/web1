# ----------- Frontend Build Stage -----------
FROM node:20-alpine as frontend-builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY frontend/package*.json ./frontend/
RUN npm ci --prefix frontend

# Copy the rest of the frontend source code
COPY frontend/ ./frontend/

# Set environment variables (for Firebase or other settings)
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_MEASUREMENT_ID

ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
ENV VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN
ENV VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID
ENV VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID
ENV VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID
ENV VITE_FIREBASE_MEASUREMENT_ID=$VITE_FIREBASE_MEASUREMENT_ID

# Build the frontend application
RUN npm run build --prefix frontend

# ----------- Backend Build Stage -----------
FROM node:20-alpine as backend-builder

# Set working directory for backend
WORKDIR /app

# Copy backend package files and install dependencies
COPY backend/package*.json ./backend/
RUN npm ci --prefix backend

# Copy the rest of the backend source code
COPY backend/ ./backend/

# Expose backend port
EXPOSE 5000

# ----------- Final Production Stage (Frontend + Backend) -----------

FROM nginx:alpine

# Copy built frontend assets from the frontend builder stage
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the backend app and install dependencies
COPY --from=backend-builder /app/backend /app/backend

# Set working directory for backend and run it
WORKDIR /app/backend
RUN npm install

# Start the backend server (e.g., Express)
CMD ["npm", "start", "--prefix", "backend"]
