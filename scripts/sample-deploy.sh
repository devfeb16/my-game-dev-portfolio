#!/bin/bash
set -euo pipefail

echo "🧩 Starting simple Next.js redeploy..."

# Move to project root
cd "$(dirname "$0")/.." || { echo "❌ Project root not found"; exit 1; }

# Pull latest code
if [ -d .git ]; then
  echo "📦 Fetching latest code..."
  git fetch origin master
  git reset --hard origin/master
else
  echo "⚠️ No Git repository found. Skipping fetch."
fi

# Install dependencies fresh
echo "📦 Reinstalling dependencies..."
rm -rf node_modules
npm install --no-audit --no-fund

# Build project
echo "⚙️ Building project..."
npm run build

# PM2 config
APP_NAME="unitydevs4000"
PORT=4000

# Start or reload PM2
if pm2 list | grep -q "$APP_NAME"; then
  echo "🔁 Reloading existing PM2 process..."
  pm2 reload "$APP_NAME" --update-env
else
  echo "🚀 Starting new PM2 process..."
  pm2 start npm --name "$APP_NAME" -- run start -- -p $PORT -H 0.0.0.0
fi

pm2 save

echo "✅ Deployment completed!"
