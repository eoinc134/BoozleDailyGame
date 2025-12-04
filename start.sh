#!/bin/bash

# === Start the Boozle Backend Server ===
echo "Starting Boozle Backend Server..."
cd boozle-backend
npm install
npm start &

echo "Boozle Backend Server started."

# === Start the Boozle Frontend Server ===
echo "Building Boozle Frontend..."
cd ../boozle-frontend
npm install
npm run build

echo "Boozle Frontend Server started."

# Start a simple HTTP server to serve the built frontend
echo "Starting Boozle Frontend Server..."
PORT=${PORT:-3000}
npx serve -s build -l $PORT

wait