#!/usr/bin/env bash

CURRENT_DIR=$(basename $(pwd))

# Verify script is being executed from the root of the repository
if [ "$CURRENT_DIR" != "byndr" ]; then
  echo "Please run this script from the root of the repository"
  exit 1
fi

# Check if the database is running
if [ ! "$(docker ps -q -f name=byndr_db)" ]; then
  echo "Database is not running. Please start the database first"
  exit 1
fi

# Migration files 
MIGRATION_FILES=$(ls tools/migrations/*.sql | sort -n)
echo "${MIGRATION_FILES}"

