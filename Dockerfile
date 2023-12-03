FROM node:18-alpine as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --prod
CMD ["npm", "start"]