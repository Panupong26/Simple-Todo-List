
const db = require('../models');



const getList = async (req,res) => {
    try {
        const todo = await db.list.findAll({where: {userId: req.user.id}});
        res.status(200).send(todo);
    } catch {
        return res.status(500);
    }
}

const postList = async (req,res) => {
    try {
        const {date, time, text} = req.body;
        const userId = req.user.id;
        await db.list.create({
            date : date,
            time : time,
            text : text,
            userId: userId,
        })
        return res.status(201).send('List Created');
    } catch(err) {
        return res.status(500);
    }
}

const updateList = async (req,res) => {
    try {
        const {id, date, time, text} = req.body;
        const userId = req.user.id;

        await db.list.update({
                date: date, 
                time: time, 
                text: text
            },
            {where: {
                id: id ,
                userId: userId
            }
        });
        res.status(200).send('List Updated');
    } catch {
        return res.status(500);
    }
}

const deleteList = async (req,res) => {
    try {
        await db.list.destroy({
            where: {
                id: req.body.id,
                userId: req.user.id
            }
        });
        res.status(204).send();
    } catch {
        return res.status(500);
    }   
}

module.exports = {
    getList,
    postList,
    updateList,
    deleteList,
}
