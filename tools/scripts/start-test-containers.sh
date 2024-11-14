#!/usr/bin/env bash

docker compose -f docker-compose.test.yml --env-file .env.test up \
    -d \
    --build \
    --remove-orphans

sleep 3