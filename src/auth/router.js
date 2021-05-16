'use strict';


// CREATING ROUTER FROM EXPRESS

const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt'); //to bcrypt out request

const base64 = require('base-64'); // to encode our user name


const UserClass = require('./models/users-model.js');

const usersSchema = require('./models/user-schema');

const userInstance = new UserClass(usersSchema);

router.post('/signup', signUpHandler);

router.post('/signin', signInHandler);



// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo

async function signUpHandler(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // const user = new Users(req.body);
    // const record = await user.save(req.body);
    const record = await userInstance.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
}


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
async function signInHandler(req, res) {
  /*
    req.headers.authorization is : "Basic sdkjdsljd="
    To get username and password from this, take the following steps:
      - Turn that string into an array by splitting on ' '
      - Pop off the last value
      - Decode that encoded string so it returns to user:pass
      - Split on ':' to turn it into an array
      - Pull username and password from that array
  */

  let basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', 'sdkjdsljd=']
  console.log('basicHeaderParts', basicHeaderParts);

  let encodedString = basicHeaderParts.pop(); // sdkjdsljd=
  console.log('encodedString', encodedString);

  let decodedString = base64.decode(encodedString); // "username:password"
  console.log('decodedString', decodedString);

  let [username, password] = decodedString.split(':'); // username, password

  console.log('username', username);
  console.log('password', password);

  /*
    Now that we finally have username and password, let's see if it's valid
    1. Find the user in the database by username
    2. Compare the plaintext password we now have against the encrypted password in the db
       - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    3. Either we're valid or we throw an error
  */
  try {

    const user = await usersSchema.findOne({ username: username });
    // const user = await userInstance.create(req.body);
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    } else {
      throw new Error('Invalid User');
    }
  } catch (error) { res.status(403).send('Invalid Login'); }

}
module.exports = router;