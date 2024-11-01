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
    {id: '1223', type: 'group', name: 'Group 1', user_ids: ['kswamin3', 'sshunmu2', 'sshunmu'], exp_ids: ['e11', 'e12', 'e13']},
    {id: '1224', type: 'group', name: 'Group 2', user_ids: ['kswamin3', 'sshunmu2', 'sshunmu'], exp_ids: ['e21', 'e22', 'e23']},
    {id: '1225', type: 'group', name: 'Group 3', user_ids: ['kswamin3', 'sshunmu2', 'sshunmu'], exp_ids: ['e31', 'e32', 'e33']},
    {id: '1234', type: 'personal', name: 'Krithika', user_ids: ['kswamin3'], exp_ids: ['e1234', 'e12341', 'e12342']},
    {id: '1235', type: 'personal', name: 'Sandhiya', user_ids: ['sshunmu2'], exp_ids: ['e1235', 'e12351', 'e12342']},
    {id: '1236', type: 'personal', name: 'Sanjaey', user_ids: ['sshunmu'], exp_ids: ['e1236', 'e12361', 'e12362']}
])

db.getCollection('expense_details').insertMany([
    { id: 'e11', type: 'group', owner: 'kswamin3', grp_id: '1223', memberShare: {'kswamin3': 30, 'sshunmu2': 30, 'sshunmu': 40}, total_cost: 100, title: 'Exp 1', description: 'On some date', category: 'Rent'},
    { id: 'e12', type: 'group', owner: 'sshunmu2', grp_id: '1223', memberShare: {'kswamin3': 30, 'sshunmu2': 30, 'sshunmu': 40}, total_cost: 100, title: 'Exp 2', description: 'On some date', category: 'Electricity'},
    { id: 'e13', type: 'group', owner: 'sshunmu', grp_id: '1223', memberShare: {'kswamin3': 30, 'sshunmu2': 30, 'sshunmu': 40}, total_cost: 100, title: 'Exp 3',  description: 'On some date', category: 'Water'},
    { id: 'e21', type: 'group', owner: 'kswamin3', grp_id: '1224', memberShare: {'kswamin3': 30, 'sshunmu2': 30, 'sshunmu': 40}, total_cost: 100, title: 'Exp 4',  description: 'On some date', category: 'Gas'},
    { id: 'e22', type: 'group', owner: 'sshunmu2', grp_id: '1224', memberShare: {'kswamin3': 30, 'sshunmu2': 30, 'sshunmu': 40}, total_cost: 100, title: 'Exp 5',  description: 'On some date',category: 'Rent'},
    { id: 'e23', type: 'group', owner: 'sshunmu', grp_id: '1224', memberShare: {'kswamin3': 30, 'sshunmu2': 30, 'sshunmu': 40}, total_cost: 100, title: 'Exp 6',  description: 'On some date', category: 'Electricity'},
    { id: 'e31', type: 'group', owner: 'kswamin3', grp_id: '1225', memberShare: {'kswamin3': 30, 'sshunmu2': 30, 'sshunmu': 40}, total_cost: 100, title: 'Exp 7',  description: 'On some date', category: 'Water'},
    { id: 'e32', type: 'group', owner: 'sshunmu2', grp_id: '1225', memberShare: {'kswamin3': 30, 'sshunmu2': 30, 'sshunmu': 40}, total_cost: 100, title: 'Exp 8',  description: 'On some date', category: 'Gas'},
    { id: 'e33', type: 'group', owner: 'sshunmu', grp_id: '1225', memberShare: {'kswamin3': 30, 'sshunmu2': 30, 'sshunmu': 40}, total_cost: 100, title: 'Exp 9',  description: 'On some date', category: 'Deposit'},
    { 'id': 'e1234', type: 'personal', owner: 'kswamin3', grp_id: '1234', memberShare: {'kswamin3': -30}, total_cost: 30, title: 'exp 1',  description: 'On some date', category: 'Rent'},
    { 'id': 'e12341', type: 'personal', owner: 'kswamin3', grp_id: '1234', memberShare: {'kswamin3': -30}, total_cost: 30, title: 'exp 2', description: 'On some date', category: 'Rent'},
    { 'id': 'e12342', type: 'personal', owner: 'kswamin3', grp_id: '1234', memberShare: {'kswamin3': -30}, total_cost: 30, title: 'exp 3', description: 'On some date', category: 'Rent'},
    { 'id': 'e1235', type: 'personal', owner: 'sshunmu2', grp_id: '1235', memberShare: {'sshunmu2': -30}, total_cost: 30, title: 'exp 1', description: 'On some date', category: 'Electricity'},
    { 'id': 'e12351', type: 'personal', owner: 'sshunmu2', grp_id: '1235', memberShare: {'sshunmu2': -40}, total_cost: 40, title: 'exp 2', description: 'On some date', category: 'Rent'},
    { 'id': 'e12352', type: 'personal', owner: 'sshunmu2', grp_id: '1235', memberShare: {'sshunmu2': -30}, total_cost: 30, title: 'exp 3', description: 'On some date', category: 'Gas'},
    { 'id': 'e12353', type: 'personal', owner: 'sshunmu2', grp_id: '1235', memberShare: {'sshunmu2': -40}, total_cost: 40, title: 'exp 4', description: 'On some date', category: 'Gas'},
    { 'id': 'e1236', type: 'personal', owner: 'sshunmu', grp_id: '1236', memberShare: {'sshunmu': -30}, total_cost: 30, title: 'exp 1', description: 'On some date', category: 'Rent'},
    { 'id': 'e12361', type: 'personal', owner: 'sshunmu', grp_id: '1236', memberShare: {'sshunmu': -30}, total_cost: 30, title: 'exp 2', description: 'On some date', category: 'Deposit'},
    { 'id': 'e12354', type: 'personal', owner: 'sshunmu2', grp_id: '1235', memberShare: {'sshunmu2': -20}, total_cost: 20, title: 'exp 5', description: 'On some date', category: 'Deposit'},
    { 'id': 'e12362', type: 'personal', owner: 'sshunmu', grp_id: '1236', memberShare: {'sshunmu': -30}, total_cost: 30, title: 'exp 3', description: 'On some date', category: 'Electricity'},
    { 'id': 'e12362', type: 'personal', owner: 'sshunmu', grp_id: '1236', memberShare: {'sshunmu': -30}, total_cost: 30, title: 'exp 3', description: 'On some date', category: 'Electricity'}
])

// use('Track-Ur-Tab')
// db.getCollection('user_details').findOne({ id: 'kswamin3'})

// use('Track-Ur-Tab')
// db.getCollection('grp_details').findOne({ id: '1223' })

// use('Track-Ur-Tab')
// db.getCollection('expense_details').find({ grp_id: '1235' })