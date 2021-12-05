const HttpError = require('../models/http-error');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find user.',
            500
        );
        return next(error);
    }

    res.json(users);
};

const getUser = async (req, res, next) => {
    const uid = req.params.uid;
    let user;
    try {
        user = await User.findById(uid).populate('games');
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find user.',
            500
        );
        return next(error);
    }

    res.json(user);
};

const signup = async (req, res, next) => {

    const {username, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(error);
    }

    let hashedPassword;
    hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = new User({
        username,
        email,
        password: hashedPassword,
        games: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    let token;
    token = jwt.sign(
            { userId: createdUser._id, username: createdUser.username},
            'supersecret_dont_share',);

    res
        .status(201)
        .json(
            {
                userId: createdUser._id,
                username: createdUser.username,
                token:token
            });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    let isValidPassword = false;
    isValidPassword = await bcrypt.compare(password, existingUser.password);

    if (!isValidPassword) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    let token;
    token = jwt.sign(
        { userId: existingUser.id, username: existingUser.username },
        'supersecret_dont_share',
    );

    res.json({
        userId: existingUser._id,
        username: existingUser.username,
        token: token,
    });
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.signup = signup;
exports.login = login;