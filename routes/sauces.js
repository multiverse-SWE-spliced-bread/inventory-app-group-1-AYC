// const express = require('express')
// const {Sauce} = require('../models')
// const {check, validationResult} = require('express-validator')
// const saucesRT = express.Router()

// saucesRT.get('/:id', async (req, res) => {
//     const data = await Sauce.findByPk(req.params.id)
//     if (!data) {
//         res.status(400).send('There is no sauce with this id.')
//         return
//     }
//     res.send(data)
// })

// module.exports = {saucesRT}