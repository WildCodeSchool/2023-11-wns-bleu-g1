#!/bin/sh
echo "PORT=$PORT"
git fetch origin && git reset --hard origin/master && git clean -f -d
GATEWAY_PORT=$PORT docker-compose -f docker-compose.production.yml up --build -d