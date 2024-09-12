REGISTRY=docker-registry.it.csiro.au
PROJECT_PATH=wilddan
PROJECT_NAME=sdui
VERSION=0.0.1
IMAGE_NAME=$(REGISTRY)/$(PROJECT_PATH)/$(PROJECT_NAME):$(VERSION)

build:
	docker build --platform linux/amd64 -t $(IMAGE_NAME) .

push:
	docker push $(IMAGE_NAME)