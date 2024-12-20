const mongoose = require('mongoose')

const ExpenseDetailsSchema = new mongoose.Schema({
    id: String,
    type: String,
    owner: String,
    grp_id: String,
    memberShare: JSON,
    total_cost: Number,
    title: String,
    description: String,
    category: String
}, {
    collection: 'expense_details'
});

mongoose.model('expense_details', ExpenseDetailsSchema);