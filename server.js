const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { Pool } = require('pg')
const securePassword = require('secure-password');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Vuxu"T+C=d5pIXa+s%dY+R=9!}mZ1R0/ZwS4Js[*F2:PB=eAX5&"v9,UwK5$5?~';

// init the password policy
const pwd = securePassword();

// postgres connection pool
const pool = new Pool({
  user: 'tiny_user',
  host: 'localhost',
  database: 'tiny_users_db',
  password: 'tiny_user_password',
  port: 5432,
});

const port = 3003;

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/**
 * @api {post} /create
 * @apiName create_user
 * 
 * @apiParam {String} email The user email address
 * @apiParam {String} password The user password
 * @return {
 * }
 */
app.post('/create',

  [
    check('email').isEmail(),
    check('password').isLength({min: 6})
  ],

  (req, res) => {

    const { email, password } = req.body;
    // check for input errors
    const input_errors = validationResult(req);
    if ( !input_errors.isEmpty() )
    {
      return res.status(422).json({
        status: 'input_error',
        content: input_errors.array()
      });
    }

    // hash the password
    const buffer_password = Buffer.from(password);
    async function hash_and_create_user () {

      // hash password
      let hash_password = await pwd.hash(buffer_password);
      // create new user and return jwt token
      pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
        [email, hash_password],
        (err, result) => {

          if (err)
          {
            console.log(err.stack);
            return res.status(500).json({ status:'insert_error', content: err.message });
          }

          // get the id created
          let user_id = result.rows[0].id;
          let token = jwt.sign({id: user_id, email: email}, JWT_SECRET, {algorithm: 'HS256'});

          return res.status(200).json({status: "success", content: token});
        }
      );
    }
    return hash_and_create_user();
  } // end of (req, res) =>

);

app.post('/connect', (req, res) => {
  console.log("connect an existing user");
  res.send("connect");
});

app.post('/verify', (req, res) => {
  console.log("verify that the token is")
  res.send("verify");
});

app.listen(port, () => console.log(`Up and running on port ${port}`));