#!/bin/sh
# fetch_and_deploy_production
docker compose -f docker-compose.production.yml down && \
docker compose -f docker-compose.production.yml pull && \
docker compose -f docker-compose.production.yml --env-file .env.production up -d --build