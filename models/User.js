const { db, DataTypes } = require('../db')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    }
})

module.exports = {User}