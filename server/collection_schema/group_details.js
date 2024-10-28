const mongoose = require('mongoose')

const GroupDetailsSchema = new mongoose.Schema({
    id: String,
    type: String,
    name: String,
    user_ids: [String],
    exp_ids: [String]
}, { collection: 'grp_details' })

mongoose.model('grp_details', GroupDetailsSchema);