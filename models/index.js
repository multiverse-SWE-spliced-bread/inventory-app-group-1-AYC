const {User} = require('./User');
const {Item} = require('./Item');

User.belongsToMany(Item, {through: "user_item"});
Item.belongsToMany(User, {through: "user_item"});

module.exports = {
    User,
    Item
};