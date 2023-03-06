const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, 'A expens must have a type'],
            enum: {
                values: ["income", "expense"],
                message: 'Please choose either: income or expense'
            }
        },
        catagory: {
            type: String,
            required: [true, 'A expens must have a catgory'],
            maxlength: 20,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 120,
        },
        amount: {
            type: Number,
            required: [true, 'A expense must have a amount']
        },
        refrence: {
            type: String,
            maxlength: 12,
        },
        date: {
            type: Date,
            default: Date.now(),
            required: [true, "please enter date"]
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },

    }, { timestamps: true },)

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;

