#!/usr/bin/env bash

npx concurrently --kill-others -c auto \
    -n "service-auth,service-supergraph:serve,service-cards:serve,byndr:serve"\
    "npx nx run service-auth:serve"\
    "npx nx run service-supergraph:serve"\
    "npx nx run service-cards:serve"\
    "npx nx run byndr:serve -p 3001"