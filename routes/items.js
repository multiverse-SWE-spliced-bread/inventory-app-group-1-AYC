const express = require('express')
const {Item} = require('../models')
const {check, validationResult} = require('express-validator')
const itemsRt = express.Router()

itemsRt.get('/:id', async (req, res) => {
    const data = await Item.findByPk(req.params.id)
    if (!data) {
        res.status(400).send('There is no item with this id.')
        return
    }
    res.send(data)
})

module.exports = {itemsRt}