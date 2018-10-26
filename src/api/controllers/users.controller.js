const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users.model');

var UserController = {
  get_all_users: (req,res) => {
    User.find()
    .select('username email created_at')
    .exec()
    .then(result => {
      res.status(200).json({
        users: result.map(user => {
          return {
            _id: user._id,
            username: user.username,
            email: user.email,
            created_at: user.created_at,
            
            request: {
              name: "get_user",
              type: "GET",
              url: "http://localhost:3000/users/" + user._id

            }
          }
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error:err
      });
    });
  },
  get_user: (req, res) => {
    const id= req.params.userId;
    User.findById(id)
    .select("username email created_at")
    .exec()
    .then(user => {
      if(!user){
        res.status(404).json({
          message: "User not found, by the id you searched"
        });
      }
      res.status(200).json({
        user: user,
        request: {
          name: "get_all_users",
          type: "GET",
          url:"http://localhost:3000/users"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error:err
      });
    });
  }

}


module.exports = UserController