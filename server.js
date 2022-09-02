const seed = require('./seedData/seed')
const express = require('express')
const {itemsRt, saucesRT} = require('./routes')
const app = express()
const PORT = 3000
const cors = require('cors');
seed()

app.use(cors());

app.use(express.json())
app.use('/items', itemsRt)
// app.use('./sauces', saucesRT)

app.listen(PORT, () => {
    console.log(`The server is live and listening at port ${PORT}`)
})