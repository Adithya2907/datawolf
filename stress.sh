#!/bin/bash

SERVER_URL="localhost:3000/log"
JSON_FILE="./data.json"

REQUEST_COUNT=10

echo "Stress testing server at $SERVER_URL..."

make_request() {
  curl -X POST -H "Content-Type: application/json" -d '{"message": "Oh, no", "level": "info"}' "$SERVER_URL" 
}

for ((i=1; i<=$REQUEST_COUNT; i++)); do
  make_request &
done

wait

echo "All requests completed"