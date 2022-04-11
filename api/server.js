// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();


// POST     /api/users   creates user using information inside request body
//GET       /api/users      returns users array
//GET       /api/users/:id  user object with specified id
//DELETE    /api/users/:id  removes specified user and returns deleted user
//PUT       /api/users/:id  updates specified user using data from request body. returns modified user


module.exports = server; // EXPORT YOUR SERVER instead of {}
