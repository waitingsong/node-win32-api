#!/bin/bash
set -e

psql -V
# netstat -tunpl
# dig postgres

psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U$POSTGRES_USER -d $POSTGRES_DB -c "SHOW TIMEZONE;"

echo -e "\n"

SQL_DIR='./packages/demo/src/database/'

cd "$SQL_DIR"
. ./init-db.sh
cd -

