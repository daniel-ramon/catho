FROM alpine:latest

RUN apk update && apk add mysql-client
