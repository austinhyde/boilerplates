FROM golang:1.15-alpine

# Layer 1: baseline dependencies and utilities
RUN apk add docker-cli bash build-base git

# Layer 2: build dependencies
RUN GO111MODULE=on go get github.com/golang/mock/mockgen@v1.4.4