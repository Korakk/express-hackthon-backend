const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/user-authentication/check.users.authentication");
const UserController = requier("../controllers/users.controller.js");
//get_all_users
router.get('/', UserController.get_all_users);

//get_user (auth or not?)
router.get('/:userId', UserController.get_user);

//signUp
router.post('/signup', UserController.user_signUp);

//login
router.post('/login', checkAuth, UserController.user_login);

//Delete user
router.delete('/:userId', checkAuth,UserController.delete_user);