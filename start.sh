#!/bin/bash

echo "==================================="
echo "Airport Admin Panel Startup Script"
echo "==================================="

# Check if backend is built
if [ ! -d "backend/build" ]; then
    echo "Building backend..."
    cd backend && ./gradlew build --no-daemon
    cd ..
fi

# Start backend in background
echo "Starting backend server on port 8080..."
cd backend
./gradlew run --no-daemon &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 10

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend && npm install
    cd ..
fi

# Start frontend
echo "Starting frontend development server on port 3000..."
cd frontend
npm run dev

# When frontend stops, kill backend
kill $BACKEND_PID
