const express = require('express')
const {Item,User} = require('../models')
const {check,validationResult} = require("express-validator");
const { items } = require('../seedData/seedData')
// const {check, validationResult} = require('express-validator')
const itemsRt = express.Router()

itemsRt.get('/', async (req, res) => {
    const allItems = await Item.findAll()
    res.send(allItems)
})

itemsRt.get('/:id', async (req, res) => {
    const data = await Item.findByPk(req.params.id)
    if (!data) {
        res.status(400).send('There is no item with this id.')
        return
    }
    res.send(data)
})

itemsRt.post('/',[
    check("title").trim().not().isEmpty().withMessage('title must have content'),
    check("price").isNumeric().withMessage('price must be a number'),
    check("description").trim().not().isEmpty().withMessage('description must have content'),
    check("category").trim().not().isEmpty().withMessage('category must have content'),
    check("image").isURL().withMessage('image must be a URL')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Error: Invalid data submitted");
        return res.status(400).send({error: errors.array()});
    }
    let newItem = req.body;
    await Item.create({
        title: newItem.title,
        price: newItem.price,
        description: newItem.description,
        category: newItem.category,
        image: newItem.image
    });
    console.log("Created new item: " + newItem.title);
    let allItems = await Item.findAll();
    res.status(202).send(allItems);
});

itemsRt.put('/:item/:user', async (req, res) => {
    const item = await Item.findByPk(req.params.item);
    const user = await User.findByPk(req.params.user);
    await item.addUser(user);
    res.send(200);
});

itemsRt.delete('/:item', async (req, res) => {
    const item = await Item.findByPk(req.params.item);
    await item.destroy();
    res.send(200);
});

itemsRt.put('/:id',[
    check("title").trim().optional().not().isEmpty().withMessage('title must have content'),
    check("price").optional().isNumeric().withMessage('price must be a number'),
    check("description").trim().optional().not().isEmpty().withMessage('description must have content'),
    check("category").trim().optional().not().isEmpty().withMessage('category must have content'),
    check("image").optional().isURL().withMessage('image must be a URL')
], async (req, res) => {
    console.log("Put request!");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Error: Invalid data submitted");
        return res.status(400).send({error: errors.array()});
    }
    let findItem = await Item.findByPk(req.params.id);
    let newItem = req.body;
    console.log("FIND:",findItem);
    console.log("NEW:",newItem);
    if (newItem.title) {
        console.log("NEW TITLE");
        await findItem.update({
            title: newItem.title
        });
    }
    if (newItem.price) {
        console.log("NEW PRICE");
        await findItem.update({
            price: newItem.price
        });
    }
    if (newItem.description) {
        console.log("NEW DESC");
        await findItem.update({
            description: newItem.description
        });
    }
    if (newItem.category) {
        console.log("NEW CATEGORY");
        await findItem.update({
            category: newItem.category
        });
    }
    if (newItem.image) {
        console.log("NEW IMAGE");
        await findItem.update({
            image: newItem.image
        });
    }
    findItem = await Item.findByPk(req.params.id);
    console.log("Updated item: " + findItem.title);
    let allItems = await Item.findAll();
    res.status(202).send(allItems);
});

module.exports = {itemsRt}