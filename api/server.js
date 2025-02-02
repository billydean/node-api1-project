// BUILD YOUR SERVER HERE
const express = require('express');

const User = require('./users/model');
const server = express();

server.use(express.json());




server.post('/api/users', (req,res)=>{
    let user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user",
        })
    } else {
        User.insert(user)
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(error => {
                res.status(500).json({
                    message: "There was an error while saving the user to the database",
                    error: error.message
                })
            })
    }
})

server.get('/api/users', (req,res)=>{
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(500).json({
                message: 'The users information could not be retrieved',
                error: error.message,
            })
        })
})

server.get('/api/users/:id', (req,res)=>{
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist",
                })
            }
            res.json(user);
        })
        .catch(error => {
            res.status(500).json({
                message: 'The users information could not be retrieved',
                error: error.message,
            })
        })
})

server.delete('/api/users/:id', (req,res) => {
    User.remove(req.params.id)
        .then(deletedUser => {
            if (!deletedUser) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.json(deletedUser)
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "The user could not be removed",
                error: error.message,
            })
        })
})
server.put('/api/users/:id', (req,res) => {
    let id = req.params.id;
    let user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user",
        })
    } else {
    User.update(id, user)
        .then(updatedUser => {
            if (!updatedUser) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.status(200).json(updatedUser);
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "The user information could not be modified",
                error: error.message
            })
        })
    }
})

//PUT       /api/users/:id  updates specified user using data from request body. returns modified user
module.exports = server; // EXPORT YOUR SERVER instead of {}
