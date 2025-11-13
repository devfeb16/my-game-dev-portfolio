#!/bin/bash
set -euo pipefail

echo "🧩 Starting Next.js deployment for unitydevs.com..."

# Move to project root
cd "$(dirname "$0")/.." || { echo "❌ Failed to find project root"; exit 1; }

# Fetch latest code
if [ -d .git ]; then
  echo "📦 Fetching latest code from GitHub..."
  git fetch origin master
  git reset --hard origin/master
else
  echo "⚠️ No git repository found."
fi

# Load NVM
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

# Ensure correct Node version
echo "🧠 Ensuring Node 20.11.1 is installed..."
nvm install 20.11.1
nvm use 20.11.1

# Verify Node + npm
node -v
npm -v

# Ensure PM2 is installed
if ! command -v pm2 &> /dev/null; then
  echo "📦 Installing PM2 globally..."
  npm install -g pm2
fi

# Clean up previous builds
echo "🧹 Cleaning up old dependencies and cache..."
rm -rf node_modules
npm cache clean --force

# Install dependencies
echo "📦 Installing dependencies..."
npm install --no-audit --no-fund

# Build the project
echo "⚙️ Building project..."
npm run build

# Run with PM2
APP_NAME="unitydevs4000"
PORT=4000

if pm2 list | grep -q "$APP_NAME"; then
  echo "🔁 Reloading existing PM2 process..."
  pm2 reload "$APP_NAME" --update-env
else
  echo "🚀 Starting new PM2 process..."
  pm2 start npm --name "$APP_NAME" -- run start -- -p $PORT -H 0.0.0.0
fi

pm2 save

echo "✅ Deployment completed successfully!"


