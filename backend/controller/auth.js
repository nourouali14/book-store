
const User = require('../models/user');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(403).json("User already exists");
        }

        if (req.body.role !== 'admin' && req.body.role !== 'user') {
            return res.status(403).json("Please provide a valid role (admin or user)");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("wrong password");
        res.status(200).json({id:user._id, username:user.username, role:user.role,email:user.email});
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const getRole = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("User not found");
        }
        return user.role;
    } catch (err) {
        throw err;
    }
};

const getUserId = async (email) => {
    try {
        const user = await User
            .findOne({ email: email })
            .select('_id');
        if (!user) {
            throw new Error("User not found");
        }
        return user._id;
    }
    catch (err) {
        throw err;
    }
}


module.exports = { register, login,getRole, getUserId};