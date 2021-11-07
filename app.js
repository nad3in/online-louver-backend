require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    next();
});

const auth = require("./middleware/auth");
const userRepo = require("./api-routes/POST/user");
const artRepo = require("./api-routes/POST/art");
const genralArtRepo = require("./api-routes/GET/art");
const editArtPieceRepo = require("./api-routes/PUT/art");
const deleteArtPieceRepo = require("./api-routes/DELETE/art")
app.post("/user", async (req, res) => {
    try {
        const user = await userRepo.AddUser(req, res)
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});
app.post("/login", async (req, res) => {
    try {
        const user = await userRepo.Login(req, res)
        res.status(200).json(user);

    } catch (err) {
        console.log(err);
    }
});
app.post("/art", auth, async (req, res) => {
    try {
        const result = await artRepo.artPiecesList(req, res)
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
    }
});
app.get("/art", auth, async (req, res) => {
    try {
        const result = await genralArtRepo.getArtPieces(req, res)
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
    }
});
app.put("/art", auth, async (req, res) => {
    try {
        const result = await editArtPieceRepo.editArtPiece(req, res)
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
    }
});
app.delete("/art", auth, async (req, res) => {
    try {
        const result = await deleteArtPieceRepo.deleteArtPiece(req, res)
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
    }
});
module.exports = app;