const {users, items} = require('./seedData.js');

const { db } = require('../db');
const {Item,User} = require('../models');

const seed = async () => {

    try {
        // drop and recreate tables per model definitions
        await db.sync({ force: true });
    
        // insert data
        await Promise.all(items.map(item => Item.create(item)));
        await Promise.all(users.map(user => User.create(user)));

        console.log("db populated!");
    } catch (error) {
        console.error(error);
    }
}

module.exports = seed