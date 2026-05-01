#!/bin/bash
export SSHPASS="ImPh,RbdVk4.gLuc@X8t"
sshpass -e ssh -o StrictHostKeyChecking=no root@187.77.37.213 "cd /var/www/bnb-platform && docker rm -f bnb_redis bnb_postgres bnb_site && docker compose -f docker-compose.vps.yml up -d"
