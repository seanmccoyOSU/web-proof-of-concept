#!/bin/bash
# if you don't want to use docker api, useful for testing
docker run -d --name mysql-server-proof-of-concept -p 3306:3306 \
	-e "MYSQL_RANDOM_ROOT_PASSWORD=yes" \
	-e "MYSQL_DATABASE=proofc" \
	-e "MYSQL_USER=proofc" \
	-e "MYSQL_PASSWORD=password" \
	mysql