FROM node:20-alpine3.17 as build-env
#WORKDIR /app
#RUN npm install
#COPY . .
#RUN npm run build --prod

#FROM nginx:1.17.1-alpine
#COPY ./dist /usr/share/nginx/html

WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build-env /app/dist/FrontEnd-ArchivoHistorico/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

