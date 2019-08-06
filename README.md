# tiny user system api

Quickly set up a/your database and an API to let user register and connect to
your app.

Prototype fast, think later

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
  * [ ] think enough but not too much
  * [ ] node API, express, secure-password
  * [ ] postgreSQL
  * [ ] SQL scripts
  * [ ] strat up script (minimal)
  * [ ] first release
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
  * [ ] postgreSQL
  * [ ] MySQL/MariaDB
  * [ ] Oracle DB
  * [ ] SQL server
  * [ ] MongoDB

## Initial Development

| stuff      | version        |
|------------|----------------|
| Ubuntu     | 16.04 (xenial) |
| node.js    | 10.7.0         |
| PostgreSQL | 11.4           |


## DOC HERE

TODO


