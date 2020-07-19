#!/bin/sh

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

DOCKER_STOP="docker stop $(docker ps -aq --filter 'name=react-express')"
DOCKER_REMOVE="docker rm $(docker ps -aq --filter 'name=react-express')"

DOCKER_BUILD="docker build -t react-express ."
DOCKER_RUN="docker run \
  --env DB_PASSWORD=${DB_PASSWORD} \
  --env DB_USER=${DB_USER} \
  --env DB_NAME=${DB_NAME} \
  --env DB_HOST=${DB_HOST} \
  --name react-express \
  -p 4200:4000 \
  -d react-express"

echo "${GREEN}Stopping all docker containers: ${RED} ${DOCKER_STOP}${NC}"
eval "$DOCKER_STOP"
echo "${GREEN}Removing all docker containers: ${RED} ${DOCKER_REMOVE}${NC}"
eval "$DOCKER_REMOVE"
echo "${GREEN}Building docker image: ${RED} ${DOCKER_BUILD}${NC}"
eval "$DOCKER_BUILD"
echo "${GREEN}Starting docker container: ${RED} ${DOCKER_RUN}${NC}"
eval "$DOCKER_RUN"