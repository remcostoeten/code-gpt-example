#!/usr/bin/env bash

DB_FILE_NAME="database.db"
docker run -it --rm -v "$PWD":/db -w /db nouchka/sqlite3 sqlite3

echo "Database container was successfully created"
