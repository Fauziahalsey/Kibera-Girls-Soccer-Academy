#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="${1:-.env.pesapal.local}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE"
  exit 1
fi

if ! vercel whoami >/dev/null 2>&1; then
  echo "Run 'vercel login' first, then run this script again."
  exit 1
fi

add_env() {
  local key="$1"
  local value="$2"
  local target="$3"
  printf '%s' "$value" | vercel env add "$key" "$target" --force
  echo "Set $key for $target"
}

while IFS='=' read -r key value; do
  [[ -z "$key" || "$key" =~ ^# ]] && continue
  value="${value%$'\r'}"
  add_env "$key" "$value" production
  add_env "$key" "$value" preview
  add_env "$key" "$value" development
done < "$ENV_FILE"

echo "Done. Redeploy from Vercel dashboard or run: vercel --prod"
