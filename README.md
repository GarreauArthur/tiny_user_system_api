# tiny user system api

Quickly set up a/your database and an API to let user register and connect to
your app.

Prototype fast, think later

## getting started

Clone this repo, change the environment variables in docker-compose.yml. Type:

    docker-compose up -d

and you are done !

## GOAL

Build a tiny, easy to use, "plugable" user system (login, registration), to be
able to quickly prototype. Should be able to configure "most popular database".

### why this ?

Whenever you need to store user data, you need to store the user beforehand.
This project is made to quickly set up the minimum required to provide your
database with an id to make your foreign keys points to it. (and to let users
sign in and up).

You don't need to think about it, just `random command` and your good to go.

### TODO

* MVP
  * [/] think enough but not too much
  * [ ] node API, express, secure-password
    * [x] /create
    * [x] /connect
    * [x] /verify
  * [x] be careful of datatype of password
  * [x] postgreSQL
  * [x] SQL scripts
    * [x] create database
    * [x] drop db
  * [x] start up script (minimal)
  * [ ] delete shell script (minimal)
  * [ ] first release
  * [ ] write api doc with [apidoc.js](http://apidocjs.com/)
* Docker (it wasn't planned originally but it may be a good idea)
  * [x] dockerfile
  * [x] docker-compose
  * [x] password and stuff in env variable so we can change them easily
  * [ ] mount a volume to keep the data ?
* version 1
  * [ ] refactor
    * [ ] config file or something
    * [ ] create a doa or model or some sort of layer of abstraction for the database
  * [ ] Real startup script
    * [ ] ask for database type
    * [ ] ask for database's superuser
    * [ ] ask for existing database
    * [ ] ask for name for new database
* ADVANCED (? should we ?)
  * [ ] reset password
    * [ ] almighty reset (as a dev for protyping, if we forgot a password)
    * [ ] user reset (like a normal user)
  * [ ] add optional fields ([nick|sur]name, date of birth...)
* Database Management Systems
  * [/] postgreSQL
  * [ ] MySQL/MariaDB
  * [ ] Oracle DB
  * [ ] SQL server
  * [ ] MongoDB
* [ ] change name to `tiny_users` because it's funnier

## Initial Development

| stuff      | version        |
|------------|----------------|
| Ubuntu     | 16.04 (xenial) |
| node.js    | 10.7.0         |
| PostgreSQL | 11.4           |

## Docker (2019/10/17) - it works on my machine, then we will deploy my machine

Docker makes deployment easy, so that's what I am going to use now.

A dockerfile creates a node:10-jessie container running the server.
A docker-compose helps building the app and a postgres v12 database. Password,
username, database name, jwt secret are settable from the docker-compose file.
It makes it easy to change these values.

The database container run the script postres/init-user-db.sh, to create a user,
and the table. This script uses psql variables to be able to use the environment
variables.

## DOC HERE

### getting started

TODO

### The data

```
Table users {
  id int [pk, increment]
  email varchar(320)
  password char(128)
}
```

## Notes

### Rules, convention

No upper case => No case sensitivity problems

### Methodologies

I am trying a new work methodologies to prevent myself from overthinking and be
able to work faster.

I am also trying a new "version number" system, I called [Sovenut](https://github.com/GarreauArthur/sovenut).
It's experimental, it may be a good or terrible idea. It keeps tracks of the
dev process. It's made out of 4 numbers:

* **M**ajor: when introducing breaking changes
* **f**eature: when introducing a new feature
* **m**inor: when changing something without adding a feature
* **p**atch: when fixing a problem

Two main branches:

* develop
* master

Commit in master are forbidden, you can only merge into master. All the work is
done in develop, or in branches (ex: `f_newfeature`). The version number is
updated everytime a commit or a merge is made into develop.

### Participate

Yes do it

