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
  host: process.env.DATABASE_HOST,
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
 * @apiSuccess {String} status Status of the operation
 * @apiSuccess {String} content A jwt
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
            return res.status(500).json({ status:'db_error', content: err.message });
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

/**
 * @api
 * @apiname
 * @api {post} /connect
 * @apiName connect
 * 
 * @apiParam {String} email The user's email address
 * @apiParam {String} password The user's password
 */
app.post('/connect',

  // check that the params were sent
  [
    check('email').isEmail(),
    check('password').isLength({min: 6})
  ],

  (req, res) => {

    // check for params errors
    const input_errors = validationResult(req);
    if ( !input_errors.isEmpty() )
    {
      return res.status(422).json({
        status: 'input_error',
        content: input_errors.array()
      });
    }

    // retrieve params
    const { email, password } = req.body;

    // put the password in a buffer
    const buffer_password = Buffer.from(password);
    async function connect_user () {
      // find user
      pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email],
        (err, result) => {
          // if problem with the query
          if (err)
          {
            return res.status(500).json({ status:'db_error', content: err.message });
          }
          // if no user was found
          if ( result.rowCount == 0 )
          {
            return res.status(422).json({ status:'input_error', content: 'Invalid email' });
          }

          async function verify_password () {

            // verify password
            const stored_hash = result.rows[0].password;
            const password_verification = await pwd.verify(buffer_password, stored_hash);

            // if password is correct
            if ( 
              password_verification == securePassword.VALID 
              ||
              password_verification == securePassword.VALID_NEEDS_REHASH
            )
            {
              // get the id of the user
              let user_id = result.rows[0].id;
              // create a jwt
              let token = jwt.sign({id: user_id, email: email}, JWT_SECRET, {algorithm: 'HS256'});
              // send it
              return res.status(200).json({status: "success", content: token});
            }
            else // if password is incorrect
            {
              return res.status(422).json({ status:'input_error', content: 'Wrong password' });
            }
          } // end of verify_password
          return verify_password();
        } // end of query callback
      ); // end of pool.query
    } // end of connect_user
    return connect_user();
  } // end of /connect callback
); // end of /connect

/**
 * @api
 * @apiname
 * @api {post} /verify
 * @apiName verify
 * 
 * @apiParam {String} token The jwt token
 * @apiSuccess {Object} The decoded payload
 */
app.post('/verify', (req, res) => {
  if ( !req.body.token )
  {
    return res.status(422).json({ status:'input_error', content: 'missing token' });
  }
  
  jwt.verify(req.body.token, JWT_SECRET, (err, decoded) => {
    if (err)
    {
      return res.status(422).json({ status:'input_error', content: 'invalid token' });
    }
    return res.status(200).json({ status: 'success', content: decoded});
  });
});

app.listen(port, () => console.log(`Up and running on port ${port}`));
