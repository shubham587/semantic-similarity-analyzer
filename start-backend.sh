#!/bin/bash

echo "🚀 Starting Plagiarism Detector Backend..."
echo "=========================================="

cd backend

# Activate virtual environment
source venv/bin/activate

# Start Flask server
echo "📡 Starting Flask server on port 5001..."
python app.py 