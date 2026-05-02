#!/bin/bash
export SSHPASS="ImPh,RbdVk4.gLuc@X8t"
echo "Sincronizando arquivos com a VPS..."
sshpass -e rsync -avz --delete \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='media' \
    --exclude='*.tar.gz' \
    --exclude='*.sql' \
    -e "ssh -o StrictHostKeyChecking=no" \
    ./ root@187.77.37.213:/var/www/bnb-platform/

echo "Reiniciando containers na VPS via Stack..."
echo "Buildando imagens e Reiniciando containers na VPS via Stack..."
sshpass -e ssh -o StrictHostKeyChecking=no root@187.77.37.213 "cd /var/www/bnb-platform && docker compose -f docker-compose.vps.yml build && docker stack deploy -c docker-compose.vps.yml bnb"
