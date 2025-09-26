# Dockerfile for Medi.AI
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
CMD ["npm", "run", "dev"]
