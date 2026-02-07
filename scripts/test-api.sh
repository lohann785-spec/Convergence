#!/usr/bin/env bash

# Script de test des APIs Convergence
# Usage: bash scripts/test-api.sh

API_URL="http://localhost:3000/api"
EMAIL="test@example.com"
PASSWORD="TestPass123!"
NAME="Test User"

echo "🧪 Tests d'API Convergence"
echo "=========================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Signup
echo -e "${YELLOW}[1/3] Test Signup${NC}"
SIGNUP_RESPONSE=$(curl -s -X POST "$API_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"name\":\"$NAME\"}")

USER_ID=$(echo $SIGNUP_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -z "$USER_ID" ]; then
  echo -e "${RED}❌ Signup failed${NC}"
  echo "Response: $SIGNUP_RESPONSE"
else
  echo -e "${GREEN}✅ Signup successful - User ID: $USER_ID${NC}"
fi

echo ""

# Test 2: Login
echo -e "${YELLOW}[2/3] Test Login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

if echo $LOGIN_RESPONSE | grep -q '"id"'; then
  echo -e "${GREEN}✅ Login successful${NC}"
else
  echo -e "${RED}❌ Login failed${NC}"
  echo "Response: $LOGIN_RESPONSE"
fi

echo ""

# Test 3: Generate Code
if [ ! -z "$USER_ID" ]; then
  echo -e "${YELLOW}[3/3] Test Generate Code${NC}"
  GENERATE_RESPONSE=$(curl -s -X POST "$API_URL/generate-code" \
    -H "Content-Type: application/json" \
    -d "{\"userId\":\"$USER_ID\",\"description\":\"Test app\",\"type\":\"mobile\"}")

  if echo $GENERATE_RESPONSE | grep -q '"code"'; then
    echo -e "${GREEN}✅ Code generation successful${NC}"
  else
    echo -e "${RED}❌ Code generation failed${NC}"
    echo "Response: $GENERATE_RESPONSE"
  fi
fi

echo ""
echo -e "${GREEN}🎉 Tests terminés!${NC}"
