const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
   
    isActive: {
        type: Boolean,
        default: true
    },
    userType: {
        type: String
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);
