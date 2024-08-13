# Links

## Docker

- [install docker](https://docs.docker.com/get-docker/)
- [percona server mongodb](https://hub.docker.com/r/percona/percona-server-mongodb/)

## MongoDB

- [mongodb](https://www.mongodb.com/)
- [mongodb altlas](https://www.mongodb.com/es/atlas)
- [mongodb comunity server](https://www.mongodb.com/try/download/community)
- [mongodb shell](https://www.mongodb.com/products/tools/shell)
- [mongodb for vs code](https://www.mongodb.com/es/products/tools/vs-code)
- [mongodb compass](https://www.mongodb.com/products/tools/compass)
- [mongodb courses](https://learn.mongodb.com/catalog)

## mysql/percona-server

- [percona server 8](https://docs.percona.com/percona-server/8.0/index.html)
- [mysql 8](https://dev.mysql.com/downloads/mysql/)
- [mysql workbench](https://dev.mysql.com/downloads/workbench/)
- [mysql shell for vs code](https://marketplace.visualstudio.com/items?itemName=Oracle.mysql-shell-for-vs-code)
- [canal de base de datos utn - sql playlist](https://youtube.com/playlist?list=PLKZTJP_-zNEJOZhAHTH17D2fJTjLRiSK8&si=xzwAUY3AgDQQAd4T)

# Commands

## mongodb-docker

docker run --name mongodb-dsw -v /home/adrian/docker-volumes/percona-mongodb-dsw:/data/db -p 27017:27017 -d percona/percona-server-mongodb:latest

## percona-server-8-docker

docker run --name ps8-dsw-VolquetesHnos \
 -v /IA/docker/ps8-dsw-VolquetesHnos:/var/lib/mysql \
 -e MYSQL_ROOT_HOST='%' \
 -e MYSQL_ALLOW_EMPTY_PASSWORD="yes" \
 -e MYSQL_PASSWORD="volqueteshermanos" \
 -e MYSQL_USER="volqueteshermanos" \
 -e MYSQL_DATABASE='vhdb' \
 -p 3302:3302 \
 -d percona/percona-server

## Importar la Database (el dump de la DB) al Percona Server
docker cp path/to/your-dump.sql percona-server:/your-dump.sql
