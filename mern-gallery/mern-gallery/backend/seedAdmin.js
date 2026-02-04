const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/admin');
const dotenv = require('dotenv');

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log("Admin already exists!");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash('password123', 10); // Change 'password123' to your desired password
        const newAdmin = new Admin({
            username: 'admin',
            password: hashedPassword
        });

        await newAdmin.save();
        console.log("Admin created successfully!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();