/* * As a User, I want to view all items in inventory
	* Sequelize Model for Item
	* Name, Description, Price, Category, Image
	* Express Route to GET all Items
	* Front-end View for all Items */

const { db, DataTypes } = require('../db')

const Item = db.define('Item', {
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
    },
    category: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    }
})

module.exports = Item