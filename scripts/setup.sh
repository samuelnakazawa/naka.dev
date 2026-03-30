#!/bin/bash

# Script de setup do projeto
# Executa todas as configurações necessárias para começar a desenvolver

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_step() {
    echo -e "\n${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Header
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════╗"
echo "║   naka.dev - Setup do Projeto        ║"
echo "╔═══════════════════════════════════════╗"
echo -e "${NC}"

# Check Node.js version
print_step "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js não encontrado. Instale Node.js 20+ primeiro."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_warning "Node.js versão 20+ recomendada. Você tem: $(node -v)"
else
    print_success "Node.js $(node -v) ✓"
fi

# Check npm
print_step "Verificando npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm não encontrado."
    exit 1
fi
print_success "npm $(npm -v) ✓"

# Install dependencies
print_step "Instalando dependências..."
npm install
print_success "Dependências instaladas!"

# Setup Husky
print_step "Configurando Husky (Git Hooks)..."
npm run prepare

# Make hooks executable
if [ -d ".husky" ]; then
    chmod +x .husky/pre-commit 2>/dev/null || true
    chmod +x .husky/pre-push 2>/dev/null || true
    chmod +x .husky/commit-msg 2>/dev/null || true
    print_success "Husky configurado!"
else
    print_warning "Diretório .husky não encontrado"
fi

# Run type check
print_step "Verificando tipos..."
if npm run type-check; then
    print_success "Type check passou!"
else
    print_warning "Type check encontrou alguns problemas"
fi

# Summary
echo -e "\n${GREEN}╔═══════════════════════════════════════╗"
echo "║   Setup Concluído com Sucesso!       ║"
echo "╚═══════════════════════════════════════╝${NC}"

echo -e "\n${BLUE}Próximos passos:${NC}"
echo "  1. Inicie o servidor dev:  ${YELLOW}make dev${NC}"
echo "  2. Execute os testes:      ${YELLOW}make test${NC}"
echo "  3. Veja todos os comandos: ${YELLOW}make help${NC}"

echo -e "\n${BLUE}Documentação:${NC}"
echo "  - CI/CD Guide:      ${YELLOW}.github/CI_CD_GUIDE.md${NC}"
echo "  - Contribuindo:     ${YELLOW}CONTRIBUTING.md${NC}"
echo "  - Comandos Make:    ${YELLOW}make help${NC}"

echo -e "\n${GREEN}Feliz coding! 🚀${NC}\n"
