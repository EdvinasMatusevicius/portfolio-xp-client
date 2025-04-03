FROM node:22-alpine
WORKDIR /usr/portfolioXP/packages/client
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=0 /usr/portfolioXP/packages/client/dist /usr/share/nginx/html
EXPOSE 80