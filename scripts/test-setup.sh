#!/bin/bash

# Test script para validar o setup de CI/CD e Husky

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Validação do Setup CI/CD e Husky         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}\n"

# Track results
PASSED=0
FAILED=0

# Test function
test_check() {
    local name="$1"
    local command="$2"
    local expected="$3"
    
    echo -ne "${YELLOW}⏳${NC} Testing: $name..."
    
    if eval "$command" > /dev/null 2>&1; then
        echo -e "\r${GREEN}✓${NC}  $name"
        ((PASSED++))
    else
        echo -e "\r${RED}✗${NC}  $name"
        ((FAILED++))
    fi
}

# Tests
echo -e "${BLUE}📦 Verificando dependências...${NC}"
test_check "Husky instalado" "npm list husky"
test_check "Lint-staged instalado" "npm list lint-staged"
test_check "Prettier instalado" "npm list prettier"

echo -e "\n${BLUE}🪝 Verificando Git Hooks...${NC}"
test_check "Hook pre-commit existe" "test -f .husky/pre-commit"
test_check "Hook pre-push existe" "test -f .husky/pre-push"
test_check "Hook commit-msg existe" "test -f .husky/commit-msg"
test_check "Hook pre-commit executável" "test -x .husky/pre-commit"
test_check "Hook pre-push executável" "test -x .husky/pre-push"
test_check "Hook commit-msg executável" "test -x .husky/commit-msg"

echo -e "\n${BLUE}🔄 Verificando GitHub Actions...${NC}"
test_check "Workflow CI existe" "test -f .github/workflows/ci.yml"
test_check "Workflow Deploy existe" "test -f .github/workflows/deploy.yml"
test_check "Workflow Preview existe" "test -f .github/workflows/preview.yml"
test_check "Workflow Dependency Review existe" "test -f .github/workflows/dependency-review.yml"

echo -e "\n${BLUE}📝 Verificando configurações...${NC}"
test_check "Prettier config existe" "test -f .prettierrc"
test_check "Prettier ignore existe" "test -f .prettierignore"
test_check "Dependabot config existe" "test -f .github/dependabot.yml"

echo -e "\n${BLUE}📚 Verificando documentação...${NC}"
test_check "CI/CD Guide existe" "test -f .github/CI_CD_GUIDE.md"
test_check "Contributing guide existe" "test -f CONTRIBUTING.md"
test_check "QuickStart existe" "test -f QUICKSTART.md"
test_check "Setup Summary existe" "test -f SETUP_SUMMARY.md"

echo -e "\n${BLUE}🛠️  Verificando scripts npm...${NC}"
test_check "Script type-check" "npm run type-check --if-present"
test_check "Script format:check existe" "grep -q 'format:check' package.json"
test_check "Script lint:fix existe" "grep -q 'lint:fix' package.json"
test_check "Configuração lint-staged existe" "grep -q 'lint-staged' package.json"

echo -e "\n${BLUE}🎯 Verificando Makefile...${NC}"
test_check "Comando make ci existe" "grep -q '^ci:' Makefile"
test_check "Comando make format existe" "grep -q '^format:' Makefile"
test_check "Comando make husky-setup existe" "grep -q '^husky-setup:' Makefile"
test_check "Comando make audit existe" "grep -q '^audit:' Makefile"

# Summary
echo -e "\n${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Resultado dos Testes                      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}\n"

TOTAL=$((PASSED + FAILED))
echo -e "${GREEN}✓ Passou:${NC} $PASSED/$TOTAL"
echo -e "${RED}✗ Falhou:${NC} $FAILED/$TOTAL"

if [ $FAILED -eq 0 ]; then
    echo -e "\n${GREEN}╔════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  🎉 Todos os testes passaram!              ║${NC}"
    echo -e "${GREEN}║  Setup está completo e funcional!          ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}\n"
    
    echo -e "${BLUE}Próximos passos:${NC}"
    echo -e "  1. Configure secrets no GitHub para deploy automático"
    echo -e "  2. Execute: ${YELLOW}make dev${NC} para começar a desenvolver"
    echo -e "  3. Faça um commit de teste: ${YELLOW}git commit -m \"chore: test setup\"${NC}"
    echo -e "  4. Veja a documentação: ${YELLOW}QUICKSTART.md${NC}\n"
    
    exit 0
else
    echo -e "\n${RED}╔════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ⚠️  Alguns testes falharam                ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════╝${NC}\n"
    
    echo -e "${YELLOW}Execute:${NC}"
    echo -e "  ${YELLOW}make husky-setup${NC} - Para reconfigurar hooks"
    echo -e "  ${YELLOW}npm install${NC} - Para reinstalar dependências\n"
    
    exit 1
fi
