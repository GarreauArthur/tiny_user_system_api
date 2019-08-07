#!/usr/bin/env bash

super_user='postgres'
# TODO ask for postgreSQL superuser (or default postgres)

sudo -u "$super_user" psql -f create_db.sql

# TODO ask for an existing database OR create a new one (with or without default name)
#createdb tiny_usersystem

# TODO print info before doing anything
# while true; do
#   read -p "Are the information correct ? (yes/no)" yn
#   case $yn in
#       [Yy]* ) break;;
#       [Nn]* ) echo "retry next time" exit; exit;;
#       * ) echo "Please answer yes or no.";;
#   esac
# done
