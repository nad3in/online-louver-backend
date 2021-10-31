require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());
const User = require("./api-routes/POST/user");

app.post("/user", async (req, res) => {
    try {
        const user = await User.AddUser(req, res)
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});
app.post("/login", async (req, res) => {
    try {
        const user = await User.Login(req, res)
        res.status(201).json(user);

    } catch (err) {
        console.log(err);
    }
});

module.exports = app;