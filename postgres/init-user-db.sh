#!/usr/bin/env bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" --set=tiny_db_user="$TINY_USER_NAME" --set=tiny_db_password="$TINY_USER_PASSWORD" --set=tiny_db="$POSTGRES_DB" <<-EOSQL

  -- create table
  CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(320),
  "password" bytea
  );

  -- create user
  CREATE USER :tiny_db_user WITH ENCRYPTED PASSWORD :'tiny_db_password';
  GRANT CONNECT ON DATABASE :tiny_db TO :tiny_db_user;
  GRANT  USAGE ON SCHEMA public TO :tiny_db_user;
  GRANT SELECT, INSERT, UPDATE, DELETE ON users TO :tiny_db_user;
  GRANT ALL on users_id_seq TO :tiny_db_user;
  
EOSQL

