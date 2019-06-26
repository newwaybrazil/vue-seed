FROM node:10-alpine as builder
LABEL author="Virgilio Missão Neto <virgilio.missao@gruponewway.com.br>"
RUN mkdir /app
WORKDIR /app
COPY ./ ./
RUN apk update \
  && apk add python make
RUN npm set registry http://npm.newwaycorp.io
RUN npm install --production
RUN npm run build

# FROM node:10-alpine
# LABEL author="Virgilio Missão Neto <virgilio.missao@gruponewway.com.br>"
# WORKDIR /app
# COPY --from=builder /app .
# EXPOSE 80
# VOLUME /app/config
# CMD node .

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html/
