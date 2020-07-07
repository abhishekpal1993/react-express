#!/bin/sh

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

DOCKER_STOP="docker stop $(docker ps -aq --filter 'name=react-playground')"
DOCKER_REMOVE="docker rm $(docker ps -aq --filter 'name=react-playground')"

DOCKER_BUILD="docker build -t react-playground ."
DOCKER_RUN="docker run --name react-playground -p 4200:4000 -d react-playground"

echo "${GREEN}Stopping all docker containers: ${RED} ${DOCKER_STOP}${NC}"
eval "$DOCKER_STOP"
echo "${GREEN}Removing all docker containers: ${RED} ${DOCKER_REMOVE}${NC}"
eval "$DOCKER_REMOVE"
echo "${GREEN}Building docker image: ${RED} ${DOCKER_BUILD}${NC}"
eval "$DOCKER_BUILD"
echo "${GREEN}Starting docker container: ${RED} ${DOCKER_RUN}${NC}"
eval "$DOCKER_RUN"