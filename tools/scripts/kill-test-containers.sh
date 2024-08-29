#!/usr/bin/env bash

docker kill $(docker ps | grep -E "byndr.+test.+" | awk '{print $1}')