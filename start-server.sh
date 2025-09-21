#!/bin/bash

echo "🎉 Starting AbriTime Surprise Server..."
echo ""
echo "Your surprise will be available at:"
echo "👉 http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server when you're done"
echo ""

# Start Python's built-in server
python3 -m http.server 8000
