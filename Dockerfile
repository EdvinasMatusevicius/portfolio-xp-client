FROM node:22-alpine
WORKDIR /usr/portfolioXP
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

EXPOSE 5173
CMD [ "npm", "run", "preview" ]