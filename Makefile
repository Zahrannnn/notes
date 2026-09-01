# Edit .env, then `make up` to apply env changes without rebuilding.

COMPOSE := docker compose

-include .env

# The compose file requires IMAGE_TAG. Locally it defaults to APP_VERSION;
# the deploy pipeline pins it to the commit SHA instead.
IMAGE_TAG ?= $(APP_VERSION)

export

.PHONY: help env build up rebuild down restart logs ps push clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  make %-10s %s\n", $$1, $$2}'

env: ## Copy .env.example to .env if missing
	@if [ ! -f .env ]; then cp .env.example .env && echo "Created .env"; else echo ".env already exists"; fi

build: ## Build the Docker image
	$(COMPOSE) build

up: ## Start app from current image (regenerates runtime env, no rebuild)
	$(COMPOSE) up -d

rebuild: build up ## Rebuild image and start

down: ## Stop and remove containers
	$(COMPOSE) down

restart: ## Restart app (regenerates runtime env)
	$(COMPOSE) restart

logs: ## Tail logs
	$(COMPOSE) logs -f

ps: ## Show container status
	$(COMPOSE) ps

push: ## Push image to registry
	docker push "$(HUB_URL)/$(APP_NAME):$(APP_VERSION)"

clean: down ## Stop containers and remove the local image (keeps .env)
	@docker image rm "$(HUB_URL)/$(APP_NAME):$(APP_VERSION)" 2>/dev/null || true
