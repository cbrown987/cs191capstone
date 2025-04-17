#!/bin/sh

sudo apt-get update && apt-get install -y \
    git \
    docker \
    docker-compose-plugin \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

git clone https://github.com/cbrown987/cs191capstone.git
cd cs191capstone/deployment || return

docker-compose up -d --build






