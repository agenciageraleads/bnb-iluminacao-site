#!/bin/bash
export SSHPASS="ImPh,RbdVk4.gLuc@X8t"
sshpass -e rsync -avz --exclude='node_modules' --exclude='.next' --exclude='media' -e "ssh -o StrictHostKeyChecking=no" src/ root@187.77.37.213:/var/www/bnb-platform/src/
sshpass -e ssh -o StrictHostKeyChecking=no root@187.77.37.213 "cd /var/www/bnb-platform && docker compose -f docker-compose.vps.yml up -d --build"
