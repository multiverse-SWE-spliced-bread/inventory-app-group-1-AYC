const path = require('path')
const { Sequelize, DataTypes } = require('sequelize')

// we're connecting to our new database with "new Sequelize". "db" will represent that new database
const db = new Sequelize({
    // this is the database we are connecting to which is sqlite
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: false
});

module.exports = {
    db,
    DataTypes
};