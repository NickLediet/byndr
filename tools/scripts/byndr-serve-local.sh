#!/usr/bin/env bash

npx concurrently --kill-others -c auto \
    -n "serve-supergraph:serve,byndr:serve"\
    "npx nx run service-supergraph:serve"\
    "npx nx run byndr:serve -p 3001"