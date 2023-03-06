const User = require("../models/userModel")
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');


const attachCookie = (res, token) => {
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
    });
};

exports.createUser = catchAsync(async (req, res, next) => {

    const { name, email, password, profession } = req.body;

    if (!name || !email || !password || !profession) {
        return next(new AppError("Please provide all vlaues!", 400));
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
        return next(new AppError("user is already exists with this email adress", 401))
    }

    const user = await User.create(req.body);

    if (!user) {
        return next(new AppError(("something went wrong!! try again leter.", 401)))
    }

    const token = await user.createJWT();


    attachCookie(res, token);

    user.password = undefined;
    res.status(201).json({
        status: "success",
        user,
        token
    })
})

exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body


    if (!email || !password) {
        return next(new AppError("Please provide all vlaues!", 400))
    }

    const user = await User.findOne({ email }).select('+password');


    if (!user) {
        return next(new AppError("user is not exist", 404));
    }

    const isOk = await user.comparePassword(password);


    if (!isOk) {
        return next(new AppError("Invalide Credentialss!!", 401))
    }

    const token = await user.createJWT();
    attachCookie(res, token);


    // Remove password from output
    user.password = undefined;
    // send the response

    res.status(200).json({
        status: "success",
        user,
        token
    })

})

exports.getAllUser = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        users
    })
})

exports.getUser = catchAsync(async (req, res, next) => {
    const userId = req.user.userId;


    const user = await User.findOne({ _id: userId });

    if (!user) {
        return next(new AppError("there is  no user with this id"), 401)
    }

    res.status(200).json({
        status: 'success',
        user
    })
})

exports.updateUser = catchAsync(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.user.userId, req.body, {
        new: true,
        runValidators: true
    });

    const token = user.createJWT();
    attachCookie(res, token);


    res.status(200).json({
        status: "success",
        user,
        token
    })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    const id = req.user.userId;

    if (!id) {
        return next(new AppError("please provide id", 401));
    }

    await User.deleteOne({ _id: id });

    res.status(200).json({})
})