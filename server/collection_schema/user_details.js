const mongoose = require('mongoose')

const UserDetailsSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    phone_no: String,
    password: String,
    personal_exp: String,
    group_exp: [String]
}, {
    collection: 'user_details'
})

mongoose.model('user_details', UserDetailsSchema);