.PHONY: help up down logs migrate seed dev clean build test lint

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Start all services with docker-compose
	docker-compose up -d

down: ## Stop all services
	docker-compose down

logs: ## Show logs from all services
	docker-compose logs -f

migrate: ## Run database migrations
	docker-compose exec api pnpm prisma migrate deploy

seed: ## Run database seed scripts
	docker-compose exec api pnpm prisma db seed

dev: ## Start development mode (api + admin in watch mode)
	docker-compose up -d db redis
	sleep 5
	docker-compose exec api pnpm prisma migrate deploy
	docker-compose exec api pnpm prisma db seed
	docker-compose up api admin

clean: ## Clean all containers and volumes
	docker-compose down -v
	docker system prune -f

build: ## Build all services
	docker-compose build

test: ## Run tests
	pnpm test

lint: ## Run linting
	pnpm lint

lint:fix: ## Fix linting issues
	pnpm lint:fix

typecheck: ## Run TypeScript type checking
	pnpm typecheck

db:studio: ## Open Prisma Studio
	docker-compose exec api pnpm prisma studio

api:shell: ## Open shell in API container
	docker-compose exec api sh

admin:shell: ## Open shell in Admin container
	docker-compose exec admin sh
