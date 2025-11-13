set -euo pipefail

echo "🧩 Starting simple Next.js redeploy..."

cd "$(dirname "$0")/.." || { echo "❌ Project root not found"; exit 1; }

# Pull latest code
git fetch origin master
git reset --hard origin/master

# Install dependencies
rm -rf node_modules
npm install

# Build project
npm run build

# Start/reload PM2
APP_NAME="unitydevs4000"
PORT=4000

if pm2 list | grep -q "$APP_NAME"; then
  echo "🔁 Reloading PM2 process..."
  pm2 reload "$APP_NAME" --update-env
else
  echo "🚀 Starting PM2 process..."
  pm2 start npm --name "$APP_NAME" -- run start -- -p $PORT -H 0.0.0.0
fi

pm2 save

echo "✅ Deployment completed!"
