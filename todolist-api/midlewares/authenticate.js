const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');

const publicKey = fs.readFileSync('public-key.pem', 'utf8');



module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if(!authorization || !authorization.startsWith('Bearer')) {
            return res.status(401).send({message: 'unauthorized'});
        };

        const token = authorization.split(' ')[1];

        if(!token) {
            return res.status(401).send({message: 'unauthorized'});
        }

        const decoded = jwt.decode(token);

        let payload ;

        if(decoded.iss === "http://localhost:8080/realms/Test") {
            payload = jwt.verify(token, publicKey, {algorithms: ['RS256']});
            
            const targetUser = await db.user.findOne({where: {
                username: payload.email
            }})

            if(!targetUser) {
                const newUser = await db.user.create({
                    username: payload.email,
                })

                req.user = newUser
            } else {
                req.user = targetUser
            }
        } else {
            payload = jwt.verify(token, 'cc14todoList');
           
            const targetUser = await db.user.findOne({where: {
                username: payload.username
            }})

            if(!targetUser) {
                return res.status(401).send({message: 'unauthorized'});
            } 

            req.user = targetUser
        }

        next();

    } catch(err) {
        if(err.message === 'jwt expired') {
            console.log(err.message);
            return res.status(401).send({message: 'unauthorized'});
        } else {
            console.log(err.message);
            return res.status(500).send({message: err.message});
        }
    }  
}