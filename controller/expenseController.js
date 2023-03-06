const Expense = require("../models/expenseModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync")
const mongoose = require("mongoose")


const checkPermission = (userId, expUserId) => {
    if (userId === expUserId.toString()) {
        return true
    } else {
        return false
    }
}

exports.getAllExpense = catchAsync(async (req, res, next) => {

    const { type, search } = req.query;


    const queryObject = {
        createdBy: req.user.userId,
    };

    if (type !== "all") {
        queryObject.type = type;
    }


    if (search) {
        queryObject.catagory = { $regex: search, $options: "i" };
    }

    let result = Expense.find(queryObject);

    result = result.sort("-date");

    // setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    result = result.skip(skip).limit(limit);


    const expense = await result;

    const totalExp = await Expense.countDocuments(queryObject);
    const noOfPage = Math.ceil(totalExp / limit);

    if (!expense) {
        return next(new AppError("you dont have any expense"), 404)
    }

    res.status(200).json({
        status: "success",
        totalExpense: totalExp,
        expense,
        noOfPage

    })
})



exports.addExpense = catchAsync(async (req, res, next) => {
    const { type, catagory, amount, date } = req.body

    if (!type || !amount || !catagory) {
        return next(new AppError("please provide all values"), 400)
    }

    const data = {
        type,
        catagory,
        amount,
        description: req.body.description,
        refrence: req.body.refrence,
        createdBy: req.user.userId,
        date,
    }

    const expense = await Expense.create(data);

    res.status(201).json({
        status: "success",
        expense
    })

})


exports.updateExppense = catchAsync(async (req, res, next) => {

    const expId = req.params.id

    if (!expId) {
        return next(new AppError("please provide ID"), 400)
    }

    const expense = await Expense.findOne({ _id: expId });

    if (!expense) {
        return next(new AppError("there is no expense with this id"), 400)
    }

    const isOk = checkPermission(req.user.userId, expense.createdBy)

    if (!isOk) {
        return next(new AppError("you do not have permission"), 401)
    }

    const updatedExpense = await Expense.findOneAndUpdate({ _id: expId }, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: "success",
        updatedExpense
    })
})


exports.deleteExpense = catchAsync(async (req, res) => {
    const expId = req.params.id

    if (!expId) {
        return next(new AppError("please provise id to delete", 404));

    }

    const expense = await Expense.findOne({ _id: expId });

    if (!expense) {
        return next(new AppError("no expense found", 404));
    }

    await Expense.findOneAndDelete({ _id: expId })

    res.status(204).json({
        msg: "Success!! deleted"
    })
})


const sta = (stats) => {
    stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});
}

exports.showStats = catchAsync(async (req, res, next) => {
    let stats = await Expense.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: "$type",
                count: { $sum: 1 },
                total: { $sum: '$amount' }
            }
        },
    ]);


    res.status(200).json({ stats });
})
