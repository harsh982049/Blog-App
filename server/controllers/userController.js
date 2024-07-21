const User = require('../model/userModel');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    try
    {
        const {username, password} = req.body;
        // console.log(username, password);
        const checkUserName = await User.findOne({username});
        if(checkUserName)
        {
            return res.json({status: false, msg: 'Username is already used'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashedPassword});
        // delete user.password;
        const userObject = {
            username: user.username,
            userId: user._id
        };
        console.log(userObject);
        return res.json({status: true, user: userObject});
    }
    catch(error)
    {
        next(error);
    }
};

const login = async (req, res, next) => {
    try
    {
        const {username, password} = req.body;
        // console.log(username, password);
        const userNameCheck = await User.findOne({username});
        if(!userNameCheck)
        {
            return res.json({status: false,  msg: 'Username does not exist'});
        }
        const user = await User.findOne({username});
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword)
        {
            return res.json({status: false,  msg: 'Password is invalid'});
        }
        const userObject = {
            username: user.username,
            userId: user._id
        };
        return res.json({status: true, user: userObject});
    }
    catch(error)
    {
        next(error);
    }
};

module.exports = {login, register};