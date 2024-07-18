const mongoose = require('mongoose');

// Connect to MongoDB
const connect = mongoose.connect('mongodb://localhost:27017/users-data');


connect.then(() => {
    console.log('Database connected successfully');

    // Define the schema
    const LoginSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

    // Define the model
    const collection = mongoose.model('User', LoginSchema);

    module.exports=collection;

}).catch(err => {
    console.error('Database connection failed:', err);
});


