const mongoose = require('mongoose');

// Connect to MongoDB
const connect = mongoose.connect('mongodb://localhost:27017/users-data', {
    // useNewUrlParser and useUnifiedTopology are no longer needed in mongoose v6+
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

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
    const User = mongoose.model('User', LoginSchema);

    // Create a new user instance
    const newUser = new User({
        name: 'exampleUser',
        password: 'examplePassword'
    });

    // Save the new user document to the database
    newUser.save()
        .then(doc => {
            console.log('User saved successfully:', doc);
            mongoose.connection.close(); // Close the connection after saving
        })
        .catch(err => {
            console.error('Error saving user:', err);
            mongoose.connection.close(); // Close the connection on error
        });

}).catch(err => {
    console.error('Database connection failed:', err);
});
