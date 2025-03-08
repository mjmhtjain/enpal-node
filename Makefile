# Makefile for Docker commands

# Variables
DOCKER_COMPOSE = docker-compose
PROJECT_NAME = enpal-node

.PHONY: build up down clean rebuild logs shell-api shell-db ps help

# Default target
help:
	@echo "Available commands:"
	@echo "  make build     - Build Docker images"
	@echo "  make up        - Start all containers in detached mode"
	@echo "  make down      - Stop and remove containers"
	@echo "  make clean     - Remove containers, volumes, and unused images"
	@echo "  make rebuild   - Clean and rebuild everything"
	@echo "  make logs      - Follow logs from all containers"
	@echo "  make ps        - Show running containers"
	@echo "  make shell-api - Get a shell into the API container"
	@echo "  make shell-db  - Get a shell into the database container"

# Build Docker images
build:
	@echo "Building Docker images..."
	$(DOCKER_COMPOSE) build

# Start all containers in detached mode
up:
	@echo "Starting containers..."
	$(DOCKER_COMPOSE) up -d

# Stop and remove containers
down:
	@echo "Stopping containers..."
	$(DOCKER_COMPOSE) down

# Clean up everything
clean:
	@echo "Cleaning up Docker environment..."
	$(DOCKER_COMPOSE) down -v
	docker system prune -f

# Rebuild everything
rebuild: clean build up
	@echo "Rebuild complete."

# View logs
logs:
	@echo "Showing container logs (Ctrl+C to exit)..."
	$(DOCKER_COMPOSE) logs -f

# Container status
ps:
	@echo "Showing container status..."
	$(DOCKER_COMPOSE) ps

# Get a shell into the API container
shell-api:
	@echo "Opening shell in API container..."
	$(DOCKER_COMPOSE) exec api sh

# Get a shell into the database container
shell-db:
	@echo "Opening shell in Postgres container..."
	$(DOCKER_COMPOSE) exec postgres bash 