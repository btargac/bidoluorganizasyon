const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {type: String, required: true, max: 50, trim: true},
    sur_name: {type: String, required: true, max: 50, trim: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true, trim: true},
    status: {type: String, enum: ['Active', 'Passive'], default: 'Active', required: true}
});

// Hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, saltRounds, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {

    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//Export model
module.exports = mongoose.model('User', UserSchema);