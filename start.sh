#!/bin/bash

# === Start the Boozle Frontend Server ===
echo "Building Boozle Frontend..."
cd boozle-frontend
npm install
npm run build

echo "Boozle Backend Server started."

# === Start the Boozle Backend Server ===
echo "Starting Boozle Backend Server..."
cd ../boozle-backend
npm install

export PORT=${PORT:-3000}

npm start 

echo "Boozle Frontend Server started."
