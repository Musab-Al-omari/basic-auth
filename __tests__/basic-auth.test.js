'use strict';
require('@code-fellows/supergoose');

const UserClass = require('../src/auth/models/users-model.js');

const usersSchema = require('../src/auth/models/user-schema.js');


const userInstance = new UserClass(usersSchema);



describe('Testing the routes', () => {
  it('POST to /signup to create a new user', async() => {
    let obj = { username: 'mosab', password: '12345' };
    const record = await userInstance.create(obj);
    console.log(record);
    expect(record.username).toEqual('mosab');
    expect(record.password).toEqual('12345');
  });
  //   it('POST to /signin to login as a user (use basic auth)', async() => {

  //     const user = await usersSchema.findOne({ username: username });

  //     console.log(record);
  //     expect(record.username).toEqual('mosab');
  //     expect(record.password).toEqual('12345');
  //   });

});