-- create database
DROP DATABASE IF EXISTS tiny_users_db;
CREATE DATABASE tiny_users_db;
-- change to the new database
\c tiny_users_db;
-- create table
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(320),
  "password" varchar(128)
);

-- create user
CREATE USER tiny_user WITH ENCRYPTED PASSWORD 'tiny_user_password';
GRANT CONNECT ON DATABASE tiny_users_db TO tiny_user;
GRANT  USAGE ON SCHEMA public TO tiny_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO tiny_user;
GRANT ALL on users_id_seq TO tiny_user;
--  just in case
--  REVOKE USAGE ON SCHEMA public FROM tiny_user;
--  DROP DATABASE tiny_users_db;
--  DROP USER tiny_user;
