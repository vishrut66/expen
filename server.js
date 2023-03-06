const express = require('express');
const path = require('path');
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require('mongoose');
const expenseRouter = require("./routes/expenseRouter.js")
const userRouter = require("./routes/userRouter.js")
const errorHandlerMiddleware = require("./utils/errorHandler.js");
const cookieParser = require('cookie-parser')

const helmet = require("helmet");
const xss = require('xss-clean');
const mongoSanitize = require("express-mongo-sanitize");




dotenv.config({ path: './config.env' });
const app = express();

app.use(express.json());
// app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));



app.get("/", (req, res) => {
    res.send("hello from the server");
})

// routes
app.use("/api/v1/expense", expenseRouter)
app.use("/api/v1/user", userRouter)
app.use(errorHandlerMiddleware)


// only when ready to deploy
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});





// connecting to the database
const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD)

mongoose.set('strictQuery', true);
mongoose.connect(DB);


// starting server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`runnig on port ${port}...`))