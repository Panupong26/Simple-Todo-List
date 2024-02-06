const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const {username, password} = req.body;
        const targetUser = await db.user.findOne({where: {username: username}});
        if(targetUser) {
            return res.status(400).send({message: 'Username already in use'})
        } 
        
        const salt = bcrypt.genSaltSync(12);
        await db.user.create({
            username: username,
            password: bcrypt.hashSync(password, salt)
        })
        return res.status(201).send({message: 'Successful registration'});    
    } catch {
        return res.status(500);
    }
}

const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const targetUser = await db.user.findOne({where: {username: username}});
        if(!targetUser) {
            return res.status(400).send({message: 'Invalid username or password'});
        }
        
        const isPasswordCorrect = bcrypt.compareSync(password, targetUser.password);
    
        if(!isPasswordCorrect) {
            return res.status(400).send({message: 'Invalid username or password'});
        }
    
        const payload = {
            username : targetUser.username,
        };
    
        const token = jwt.sign(payload, 'cc14todoList', {expiresIn : 1800});
        return res.status(200).send(token);  
    } catch {
        return res.status(500);
    }  
}

const profile = async (req, res) => {
    try {
        const userId = req.user.id
        const targetUser = await db.user.findOne({where: {id: userId}});
        return res.status(200).send(targetUser);  
    } catch {
        return res.status(500);
    }
};

module.exports = {
    register,
    login,
    profile
}