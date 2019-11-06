const Sequelize = require("sequelize");

// Creating a new sequelize instance

module.exports = new Sequelize("codegig_db","root", "mysql10", {
    host: "localhost",
    dialect: "mysql",
        
pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
},
});