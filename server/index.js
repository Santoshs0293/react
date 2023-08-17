const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/user');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/user", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection successful..."))
    .catch((err) => console.log(err));

function verifyUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({ error: "Token is missing" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => { // Replace "jwt-secret-key" with your actual secret key
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            } else {
                if (decoded.role === "admin" || decoded.role === "moderator") {
                    next();
                } else {
                    return res.json("Not admin");
                }
            }
        });
    }
}

app.get('/dashboard', verifyUser, (req, res) => {
    res.json("Success");
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ name, email, password: hash })
                .then(user => res.json("Success"))
                .catch(err => res.json(err));
        }).catch(err => res.json(err));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, role: user.role },
                            "jwt-secret-key", { expiresIn: '1d' });
                        res.cookie('token', token, { httpOnly: true }); // Set httpOnly to true for security
                        return res.json({ Status: "Success", role: user.role });
                    } else {
                        return res.json("The password is incorrect");
                    }
                });
            } else {
                return res.json("No record existed");
            }
        });
});

const port = 3001; // Use a port number of your choice
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});
