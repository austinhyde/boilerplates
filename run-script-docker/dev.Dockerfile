FROM alpine

# Layer 1: baseline dependencies and utilities
RUN apk add docker-cli bash build-base git
