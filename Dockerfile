FROM node:22-alpine
WORKDIR /usr/portfolioXP/packages/client
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=0 /usr/portfolioXP/packages/client/dist /usr/share/nginx/html
EXPOSE 80

# # Stage 1: Build React App
# FROM node:22-alpine AS builder
# WORKDIR /usr/portfolioXP
# COPY package*.json ./ 
# # Copy client package.json and install dependencies
# COPY packages/client/package*.json ./packages/client/
# RUN cd packages/client && npm install
# # Copy the rest of the source code
# COPY . .
# # Run the build command from the client directory
# RUN cd packages/client && npm run build

# # Stage 2: Serve with Nginx
# FROM nginx:stable-alpine
# # Correctly copy the build output from the client's build folder
# COPY --from=builder /usr/portfolioXP/packages/client/dist /usr/share/nginx/html
# EXPOSE 80
# # Your Nginx config copy/setup would usually go here too if not handled by docker-compose volumes/command