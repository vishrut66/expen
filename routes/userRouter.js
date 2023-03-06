const express = require('express');
const userController = require('../controller/userController');
const authentication = require('../controller/authentication');
const rateLimiter = require("express-rate-limit");

const router = express.Router()


const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: "Too many requests from this IP, please try again after 15 minutes",
});


router.route('/all').get(userController.getAllUser);
router.route("/register").post(apiLimiter, userController.createUser)
router.route("/login").post(apiLimiter, userController.loginUser)



router.use(authentication.checkAuth)


router.route('/').patch(userController.updateUser).get(userController.getUser).delete(userController.deleteUser);

module.exports = router;