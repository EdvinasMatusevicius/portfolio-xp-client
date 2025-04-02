FROM node:22-alpine
WORKDIR /usr/portfolioXP
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=0 /usr/portfolioXP/dist /usr/share/nginx/html
EXPOSE 80