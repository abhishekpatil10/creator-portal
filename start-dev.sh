#!/bin/bash

# Start both the JSON Server and Vite dev server concurrently

echo "🚀 Starting Creator Portal Development Environment..."
echo ""

# Check if ports are available
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3001 is already in use (JSON Server)"
fi

if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 5173 is already in use (Vite)"
fi

echo "📦 Starting JSON Server on http://localhost:3001"
json-server --watch db.json --port 3001 --routes routes.json &

echo "⚛️  Starting Vite dev server on http://localhost:5173"
npm run dev &

# Wait for both processes
wait

