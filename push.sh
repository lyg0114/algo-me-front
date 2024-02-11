#!/bin/bash

IMAGE_NAME="algo-me-front"
TAG_VERSION="latest-v5" # should change version info

yarn install
yarn build

docker build -t ${IMAGE_NAME} .
docker tag ${IMAGE_NAME}:latest whdnseowkd/${IMAGE_NAME}:${TAG_VERSION}
docker push whdnseowkd/${IMAGE_NAME}:${TAG_VERSION}


