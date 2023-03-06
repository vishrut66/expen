const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/AppError');
const jwt = require("jsonwebtoken");

exports.checkAuth = catchAsync(async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken && !authToken.startWith('Baerer')) {
        return next(new AppError("Authorization Invlide"), 401)
    }

    const token = authToken.split(' ')[1];


    // verfy jwt token and it returns usr that trying to call the function
    const currentUser = jwt.verify(token, process.env.JWT_SECRET);

    if (!currentUser) {
        return next(new AppError("Authorization Invlide"), 401)
    }


    req.user = { userId: currentUser.userId }

    next();

})