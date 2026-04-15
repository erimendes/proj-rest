# Comando docker compose para ver a versão do mariadb
´´´shell
docker exec -it glpi-mariadb mariadb -u root -p"$MARIADB_ROOT_PASSWORD" -e "SELECT VERSION();"
´´´
# Comando do docker compose para ver a versão do glpi
´´´
docker exec -it glpi-app php bin/console --version
´´´


