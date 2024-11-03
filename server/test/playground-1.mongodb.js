/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.

use('Track-Ur-Tab');

db.getCollection('user_details').deleteMany({})
db.getCollection('grp_details').deleteMany({})
db.getCollection('expense_details').deleteMany({})

// Insert a few documents into the user_details collection.
db.getCollection('user_details').insertMany([
    { id: 'kswamin3', 'name': 'Krithika', 'email': 'kswamin3@ncsu.edu', 'phone_no':'1234567890', 'password': 'admin123', 'personal_exp': '1234', 'group_exp': ['1223', '1224', '1225']},
    { id: 'sshunmu2', 'name': 'Sandhiya', 'email': 'sshunmu2@ncsu.edu', 'phone_no':'1234567890', 'password': 'admin123', 'personal_exp': '1235', 'group_exp': ['1223', '1224', '1225']},
    { id: 'sshunmu', 'name': 'Sanjaey', 'email': 'sshunmu@ncsu.edu', 'phone_no':'1234567890', 'password': 'admin123', 'personal_exp': '1236', 'group_exp': ['1223', '1224', '1225']}
]);

db.getCollection('grp_details').insertMany([
    {id: '1223', type: 'group', name: 'NCSU Room mates 2024', user_ids: ['kswamin3', 'sshunmu2', 'sshunmu'], exp_ids: ['e11', 'e12', 'e13']},
    {id: '1224', type: 'group', name: 'Triad Triumph', user_ids: ['kswamin3', 'sshunmu2', 'sshunmu'], exp_ids: ['e21', 'e22', 'e23']},
    {id: '1225', type: 'group', name: 'Marvelous Mangoes', user_ids: ['kswamin3', 'sshunmu2', 'sshunmu'], exp_ids: ['e31', 'e32', 'e33']},
    {id: '1234', type: 'personal', name: 'Krithika', user_ids: ['kswamin3'], exp_ids: ['e1234', 'e12341', 'e12342']},
    {id: '1235', type: 'personal', name: 'Sandhiya', user_ids: ['sshunmu2'], exp_ids: ['e1235', 'e12351', 'e12342']},
    {id: '1236', type: 'personal', name: 'Sanjaey', user_ids: ['sshunmu'], exp_ids: ['e1236', 'e12361', 'e12362']}
])

db.getCollection('expense_details').insertMany([
    { id: 'e11', type: 'group', owner: 'kswamin3', grp_id: '1223', memberShare: {'kswamin3': 30, 'sshunmu2': 30, 'sshunmu': 40}, total_cost: 100, title: 'House Deposit', description: 'Paid house deposit for lease', category: 'Household'},
    { id: 'e12', type: 'group', owner: 'sshunmu2', grp_id: '1223', memberShare: {'kswamin3': 20, 'sshunmu2': 20, 'sshunmu': 20}, total_cost: 60, title: 'Electricity Deposit', description: 'Paid electricity deposit', category: 'Household'},
    { id: 'e13', type: 'group', owner: 'sshunmu', grp_id: '1223', memberShare: {'kswamin3': 10, 'sshunmu2': 30, 'sshunmu': 50}, total_cost: 100, title: 'Gas Deposit',  description: 'Paid gas deposit', category: 'Household'},
    { id: 'e21', type: 'group', owner: 'kswamin3', grp_id: '1224', memberShare: {'kswamin3': 36, 'sshunmu2': 36, 'sshunmu': 28}, total_cost: 100, title: 'Patel Common Expenses',  description: 'Bought rice, spices and vegetables', category: 'Food'},
    { id: 'e22', type: 'group', owner: 'sshunmu2', grp_id: '1224', memberShare: {'kswamin3': 310.5, 'sshunmu2': 310.5, 'sshunmu': 490}, total_cost: 1111, title: 'Rent for October 2024',  description: 'Gorman Street 1133',category: 'Household'},
    { id: 'e23', type: 'group', owner: 'sshunmu', grp_id: '1224', memberShare: {'kswamin3': 30, 'sshunmu2': 30, 'sshunmu': 40}, total_cost: 100, title: 'Virginia trip',  description: 'Fall break 2024', category: 'Transportation'},
    { id: 'e31', type: 'group', owner: 'kswamin3', grp_id: '1225', memberShare: {'kswamin3': 10, 'sshunmu2': 10, 'sshunmu': 40}, total_cost: 60, title: 'Entry ticket',  description: 'Blue ridge park', category: 'Miscellaneous'},
    { id: 'e32', type: 'group', owner: 'sshunmu2', grp_id: '1225', memberShare: {'kswamin3': 3, 'sshunmu2': 5, 'sshunmu': 2}, total_cost: 10, title: 'Tommy\'s birthday bash',  description: 'Cake, beer and food', category: 'Miscellaneous'},
    { id: 'e33', type: 'group', owner: 'sshunmu', grp_id: '1225', memberShare: {'kswamin3': 30, 'sshunmu2': 30, 'sshunmu': 40}, total_cost: 100, title: 'Internet bill',  description: 'October 2024', category: 'Household'},
    { 'id': 'e1234', type: 'personal', owner: 'kswamin3', grp_id: '1234', memberShare: {'kswamin3': -10}, total_cost: 10, title: 'Dollar Tree',  description: 'Magnets, Trick and treat', category: 'Miscellaneous'},
    { 'id': 'e12341', type: 'personal', owner: 'kswamin3', grp_id: '1234', memberShare: {'kswamin3': -5}, total_cost: 5, title: 'Food Lion', description: 'Gift cupcakes for Tom\'s birthday', category: 'Gift'},
    { 'id': 'e12342', type: 'personal', owner: 'kswamin3', grp_id: '1234', memberShare: {'kswamin3': -35}, total_cost: 35, title: 'Patel Brothers', description: 'Rice, Lentils and Soup', category: 'Food'},
    { 'id': 'e1235', type: 'personal', owner: 'sshunmu2', grp_id: '1235', memberShare: {'sshunmu2': -2}, total_cost: 2, title: 'CNS', description: 'New notebook for CNS', category: 'Education'},
    { 'id': 'e12351', type: 'personal', owner: 'sshunmu2', grp_id: '1235', memberShare: {'sshunmu2': -3.88}, total_cost: 3.88, title: 'Detergents', description: 'Toilet Cleaner, Dishwasher, Sanitizer', category: 'Household'},
    { 'id': 'e12352', type: 'personal', owner: 'sshunmu2', grp_id: '1235', memberShare: {'sshunmu2': -30}, total_cost: 30, title: 'Elastic band', description: 'Walgreens exercise band', category: 'Workout'},
    { 'id': 'e12353', type: 'personal', owner: 'sshunmu2', grp_id: '1235', memberShare: {'sshunmu2': -40}, total_cost: 40, title: 'Food Lion', description: 'Milk, Protein bars, Cereals', category: 'Food'},
    { 'id': 'e1236', type: 'personal', owner: 'sshunmu', grp_id: '1236', memberShare: {'sshunmu': -3.45}, total_cost: 3.45, title: 'Party', description: 'Balloons for Halloween decoration', category: 'Miscellaneous'},
    { 'id': 'e12361', type: 'personal', owner: 'sshunmu', grp_id: '1236', memberShare: {'sshunmu': -2}, total_cost: 2, title: 'Diwali sweets preparation', description: 'Baking Soda', category: 'Health'},
    { 'id': 'e12354', type: 'personal', owner: 'sshunmu2', grp_id: '1235', memberShare: {'sshunmu2': -1.66}, total_cost: 1.66, title: 'Cleaning agents', description: 'Broom from Dollar Tree', category: 'Household'},
    { 'id': 'e12362', type: 'personal', owner: 'sshunmu', grp_id: '1236', memberShare: {'sshunmu': -40}, total_cost: 40, title: 'Electricity Bill', description: 'For October 2024', category: 'Household'},
    { 'id': 'e12362', type: 'personal', owner: 'sshunmu', grp_id: '1236', memberShare: {'sshunmu': -4.3}, total_cost: 4.3, title: 'Milk', description: 'Milk for curd from Food Lion', category: 'Food'}
])

// use('Track-Ur-Tab')
// db.getCollection('user_details').findOne({ id: 'kswamin3'})

// use('Track-Ur-Tab')
// db.getCollection('grp_details').findOne({ id: '1223' })

// use('Track-Ur-Tab')
// db.getCollection('expense_details').find({ grp_id: '1235' })