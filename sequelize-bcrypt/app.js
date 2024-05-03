const express = require('express');
const userRoutes = require('./route/user.route');
const User = require('./model/user');
const sequelize = require('./config/database');
const PORT = 3000;

const app = express();

app.use(express.json());
app.use('/api/v1/users', userRoutes)

const initApp = async () => {
    console.log("Testing the database connection..");
    // test the connection
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        // synchronize the User model
        User.sync({ alter: true });

        app.listen(PORT, () => {
            console.log(`server listening on port ${PORT}`)
        })

    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
    }
};

// initialize the application
initApp();
