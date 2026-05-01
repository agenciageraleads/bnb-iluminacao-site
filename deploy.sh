#!/bin/bash
export SSHPASS="ImPh,RbdVk4.gLuc@X8t"
sshpass -e scp -o StrictHostKeyChecking=no bnb-update.tar.gz root@187.77.37.213:/var/www/bnb-platform/
sshpass -e ssh -o StrictHostKeyChecking=no root@187.77.37.213 "cd /var/www/bnb-platform && tar -xzf bnb-update.tar.gz && docker compose -f docker-compose.vps.yml down && docker compose -f docker-compose.vps.yml up -d --build"
