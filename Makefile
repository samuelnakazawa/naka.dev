.PHONY: help setup install dev run build start test lint clean deploy husky format check ci

# Default target
.DEFAULT_GOAL := help

# Variables
NPM := npm
NODE := node

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

help: ## Exibe esta mensagem de ajuda
	@echo "$(BLUE)Comandos disponíveis:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'

setup: ## Instala todas as dependências do projeto
	@if command -v nvm > /dev/null 2>&1 || [ -s "$$NVM_DIR/nvm.sh" ]; then \
		echo "$(YELLOW)Ativando Node.js $$(cat .nvmrc) via nvm...$(NC)"; \
		. "$$NVM_DIR/nvm.sh" && nvm install && nvm use; \
	else \
		echo "$(YELLOW)nvm não encontrado, usando Node.js do sistema: $$(node -v)$(NC)"; \
	fi
	@echo "$(YELLOW)Instalando dependências...$(NC)"
	$(NPM) install
	@echo "$(GREEN)✓ Dependências instaladas com sucesso!$(NC)"

install: setup ## Alias para setup

dev: ## Inicia o servidor de desenvolvimento
	@echo "$(YELLOW)Iniciando servidor de desenvolvimento...$(NC)"
	$(NPM) run dev

run: dev ## Alias para dev

build: ## Cria a build de produção
	@echo "$(YELLOW)Criando build de produção...$(NC)"
	$(NPM) run build
	@echo "$(GREEN)✓ Build criada com sucesso!$(NC)"

start: ## Inicia o servidor de produção (requer build)
	@echo "$(YELLOW)Iniciando servidor de produção...$(NC)"
	$(NPM) start

test: ## Executa os testes
	@echo "$(YELLOW)Executando testes...$(NC)"
	@if grep -q "\"test\":" package.json; then \
		$(NPM) test; \
	else \
		echo "$(YELLOW)⚠ Script de teste não configurado no package.json$(NC)"; \
	fi

lint: ## Executa o linter
	@echo "$(YELLOW)Executando linter...$(NC)"
	$(NPM) run lint
	@echo "$(GREEN)✓ Lint concluído!$(NC)"

lint-fix: ## Executa o linter e corrige problemas automaticamente
	@echo "$(YELLOW)Executando linter com correção automática...$(NC)"
	$(NPM) run lint:fix
	@echo "$(GREEN)✓ Lint concluído!$(NC)"

format: ## Formata o código com Prettier
	@echo "$(YELLOW)Formatando código...$(NC)"
	$(NPM) run format
	@echo "$(GREEN)✓ Código formatado!$(NC)"

format-check: ## Verifica formatação sem modificar arquivos
	@echo "$(YELLOW)Verificando formatação...$(NC)"
	$(NPM) run format:check

type-check: ## Verifica tipos do TypeScript
	@echo "$(YELLOW)Verificando tipos...$(NC)"
	$(NPM) run type-check
	@echo "$(GREEN)✓ Tipos verificados!$(NC)"

audit: ## Verifica vulnerabilidades nas dependências
	@echo "$(YELLOW)Auditando dependências...$(NC)"
	$(NPM) audit --audit-level=moderate
	@echo "$(GREEN)✓ Auditoria concluída!$(NC)"

audit-fix: ## Corrige vulnerabilidades automaticamente
	@echo "$(YELLOW)Corrigindo vulnerabilidades...$(NC)"
	$(NPM) audit fix
	@echo "$(GREEN)✓ Vulnerabilidades corrigidas!$(NC)"

husky-setup: ## Configura os hooks do Husky
	@echo "$(YELLOW)Configurando Husky...$(NC)"
	$(NPM) run prepare
	chmod +x .husky/pre-commit
	chmod +x .husky/pre-push
	chmod +x .husky/commit-msg
	@echo "$(GREEN)✓ Husky configurado!$(NC)"
pre-commit: format lint ## Simula o hook pre-commit localmente
	@echo "$(GREEN)✓ Pre-commit checks passaram!$(NC)"

pre-push: ci ## Simula o hook pre-push localmente
	@echo "$(GREEN)✓ Pre-push checks passaram!$(NC)"

all: clean setup husky-setup build ## Limpa, instala, configura Husky
ci: type-check lint format-check test audit ## Executa todas as verificações de CI localmente
	@echo "$(GREEN)✓ Todas as verificações de CI passaram!$(NC)"

clean: ## Remove node_modules e arquivos de build
	@echo "$(YELLOW)Limpando diretórios...$(NC)"
	rm -rf node_modules
	rm -rf .next
	rm -rf out
	@echo "$(GREEN)✓ Limpeza concluída!$(NC)"

deploy: ## Faz deploy na Vercel
	@echo "$(YELLOW)Fazendo deploy na Vercel...$(NC)"
	@if command -v vercel >/dev/null 2>&1; then \
		vercel --prod; \
	else \
		echo "$(YELLOW)⚠ Vercel CLI não instalado. Instalando...$(NC)"; \
		npm install -g vercel; \
		vercel --prod; \
	fi
	@echo "$(GREEN)✓ Deploy concluído!$(NC)"

deploy-preview: ## Faz deploy preview na Vercel
	@echo "$(YELLOW)Fazendo deploy preview na Vercel...$(NC)"
	@if command -v vercel >/dev/null 2>&1; then \
		vercel; \
	else \
		echo "$(YELLOW)⚠ Vercel CLI não instalado. Instalando...$(NC)"; \
		npm install -g vercel; \
		vercel; \
	fi
	@echo "$(GREEN)✓ Deploy preview concluído!$(NC)"

check: lint test ## Executa lint e testes

all: clean setup build ## Limpa, instala e faz build completo

.SILENT: help
