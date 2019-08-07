const express = require('express');
const app = express();
const port = 3003;

app.get('/', (req, res) => {
  res.send("hello boss");
});

/**
 * @api {post} /create
 * @apiName create_user
 * 
 * @apiParam {String} mail The user email address
 * @apiParam {String} password The user password
 * @return {
 * }
 */
app.post('/create', (req, res) => {
  console.log("create a new user");
  res.send("created");
});

app.post('/connect', (req, res) => {
  console.log("connect an existing user");
  res.send("connect");
});

app.post('/verify', (req, res) => {
  console.log("verify that the token is")
  res.send("verify");
});

app.listen(port, () => console.log(`Up and running on port ${port}`));