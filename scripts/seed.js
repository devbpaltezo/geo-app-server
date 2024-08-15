require("dotenv").config({path: './.env'});
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const sequelize = require('../config/database');
const User = require('../models/User');

async function createDatabase() {
    try {

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        });

        // Create the database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\`;`);
        console.log(`Database ${process.env.DB_DATABASE} created or already exists.`);
        connection.end();
    } catch (error) {
        console.error('Error creating database:', error);
        process.exit(1);
    }
}

async function seedUser() {
    try {
        // Sync the database
        await sequelize.sync({ force: true });

        // Create a hashed password
        const hashedPassword = await bcrypt.hash('password123', 10);

        // Create a user
        await User.create({
            email: 'user@example.com',
            password: hashedPassword
        });

        console.log('User seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding user:', error);
        process.exit(1);
    }
}

(async function () {
    await createDatabase();
    await seedUser();
})();
