const User = require('./models/user');
const config = require('config');
const mongoose = require('mongoose');

const mongo_user = config.get('mongo_user');
const mongo_password = config.get('mongo_password');
const mongo_host = config.get('mongo_host');
const mongo_port = config.get('mongo_port');
const mongo_db = config.get('mongo_db');

// Set up mongoose connection

const mongoDB = `mongodb://${mongo_user}:${mongo_password}@${mongo_host}:${mongo_port}/${mongo_db}`;

mongoose.connect(mongoDB, {
    useMongoClient: true
});
const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.info('connected to mongodb');
});

const userData = {
    first_name: 'Burak',
    last_name: 'Targaç',
    password: '',
    email: '',
    status: 'Active'
};

User.create(userData, function (err, userInstance) {
    if (err) {

        if (err.code === 11000) {
            // find the text between two " characters in the error message
            let errorArea = /\"(.*)\"/.exec(err.message);

            console.log(`${errorArea} ile daha önce zaten bir kayıt oluşturulmuştur.`);

        }

    } else {
        console.log('user is created');
    }

});