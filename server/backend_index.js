
require('./collection_schema/user_details')
require('./collection_schema/expense_details')
require('./collection_schema/group_details')

const randomstring = require('randomstring')
const express = require("express");
const cookie_parser = require("cookie-parser")
const app = express();
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const JWT_SECRET = 'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe'

// Collection models
const User = mongoose.model('user_details')
const Group = mongoose.model('grp_details')
const Expense = mongoose.model('expense_details')

app.use(express.json())
app.use(cookieParser())

const uri = "mongodb+srv://kswamin3:admin123@secluster.rtxmn.mongodb.net/Track-Ur-Tab?retryWrites=true&w=majority&appName=SECluster";

// Connect with Mongo DB 
const conn = mongoose.connect(uri)
conn.then(() => {
  console.log('Connection successfull');
}).catch((e) => console.log('Not able to make connection: ', e))

function verifyLoginUser(user_id, token) {
  const user = jwt.verify(token, JWT_SECRET);
  if (user.user_id == user_id) {
    return true;
  } else {
    return false;
  }
}

async function getGroupDetails(group_id) {
  let group_info = await Group.findOne({ id: group_id })
  if (!group_info) {
    return undefined;
  }
  group_info = group_info.toObject();
  let user_info = {};

  let i = 0, user_ids = group_info.user_ids, size = user_ids.length;
  for (i = 0; i < size; i++) {
    user_info[user_ids[i]] = await getUserDetails(user_ids[i]);
  }

  group_info['user_details'] = user_info;
  return group_info;
}

async function getGroupExpenses(group_id) {
  let expenses = await Expense.find({ grp_id: group_id })
  return expenses;
}

async function getUserDetails(user_id) {
  let user_info = await User.findOne({ id: user_id });
  return user_info.toObject();
}

async function getUsersDetails(user_ids) {
  let result = {};
  let i, size = user_ids.length;
  for (i = 0; i < size; i++) {
    result[user_ids[i]] = await getUserDetails(user_ids[i]);
  }
  return result;
}

async function getUserExpenses(exp_id) {
  let expenses = await getGroupExpenses(exp_id);
  let i, size = expenses.length;
  let user_details = {};
  for (i = 0; i < size; i++) {
    let members = expenses[i].toObject();
    let ud = await getUsersDetails(Object.keys(members.memberShare));
    user_details = { ...user_details, ...ud };
    expenses[i] = members;
  }
  return { user_details: user_details, expenses: expenses };
}

async function getUserDetailsWithEmailId(email_id) {
  let user_info = await User.findOne({ email: email_id });
  return user_info;
}
async function getUserIDsForEmailIDs(member_ids) {
  let i = 0, size = member_ids.length;
  let result = [];
  for (i = 0; i < size; i++) {
    let user_info = await getUserDetailsWithEmailId(member_ids[i]);
    result.push(user_info.id);
  }
  return result;
}

// Fetch personal expenses of a user 
app.post('/user/fetch-exp', async (req, res) => {
  console.log('Inside /user/fetch-exp');
  const { user_id, token } = req.body;
  let isVerifiedReq = verifyLoginUser(user_id, token);
  if (!isVerifiedReq) {
    return res.send({ status: '400', data: 'Unauthorized access!' });
  }

  try {
    let user = await getUserDetails(user_id);
    if (!user) {
      return res.send({ status: '400', data: 'User not found! ----- : )' })
    }
    let personal_expenses_id = user.personal_exp;
    let personal_expenses = await getUserExpenses(personal_expenses_id);
    res.send({ status: '200', data: personal_expenses });
  } catch (e) {
    console.log(e);
    res.send({ status: '404', data: 'Internal Server Error!' });
  }

});

// Fetch the groups in which a user is present
app.post('/user/group-details', async (req, res) => {
  console.log('Inside /user/group-details', req.body);
  const { user_id, token } = req.body;

  const verifyReq = verifyLoginUser(user_id, token);
  if (!verifyReq) {
    return res({ status: '400', data: 'Unauthorized access!' });
  }

  let user = await User.findOne({ id: user_id })
  if (!user) {
    return res.send({ status: '400', data: 'User not found!' });
  }

  try {
    let result = {};
    let groups = user.group_exp;
    for (const grp of groups) {
      let deets = await getGroupDetails(grp);
      if (deets) {
        let expenses = await getGroupExpenses(deets.id);
        result[grp] = deets;
        result[grp]['expenses'] = expenses;
      }
    }
    // console.log('Group details: ', result["1225"])
    res.send({ status: '200', data: result });
  } catch (e) {
    console.log(e)
    res.send({ status: '400', data: 'Internal Server Error!' });
  }
});

// Fetch the expenses of a group
app.post('/group/expenses', async (req, res) => {
  const { grp_id, token } = req.body;

  let group_deets = await getGroupDetails(grp_id);
  let user_ids = group_deets.user_ids;
  let authUser = false;
  for (const id of user_ids) {
    authUser = authUser || verifyLoginUser(id, token);
  };
  if (!authUser) {
    return res.send({ status: '400', data: 'Unauthorized access!' });
  }

  try {
    let expenses = await getGroupExpenses(grp_id);
    res.send({ status: '200', data: expenses });
  } catch (e) {
    res.send({ status: '404', data: 'Internal Server Error!' });
  }

})

// Update the expense 
app.post('/expense/update/:id', async (req, res) => {
  console.log('Inside /expense/update', req.body)
  let id = req.params.id;
  const { token, type, owner, grp_id, total_cost, title, description, category, member_costs } = req.body;

  let isVerify = verifyLoginUser(owner, token)
  if (!isVerify) {
    return res.send({ status: '400', data: 'Unauthorized user' })
  }

  try {

    // Add that expense to a group
    let group_details = await getGroupDetails(grp_id);

    if (!group_details) {
      return res.send({ status: '400', data: 'No valid group information available!' });
    }

    //validation on total_cost 
    let sum = 0;
    Object.keys(member_costs).forEach(user => {
      if (member_costs[user] < 0) {
        sum = sum + (member_costs[user] * -1);
      } else {
        sum = sum + member_costs[user];
      }
    })
    if (sum != total_cost) {
      return res.send({ status: '400', data: 'Total costs and individual costs mismatch' })
    }

    let new_expense = {};
    Object.keys(member_costs).forEach(member => {
      new_expense[member] = member_costs[member]
    });
    await Expense.updateOne({ id: id }, {
      $set: {
        id: id,
        grp_id: grp_id,
        type: type,
        total_cost: total_cost,
        memberShare: new_expense,
        title: title,
        description: description,
        category: category
      }
    });

    console.log("Successfully updated an expense! Mapping it to groups...")

    res.send({ status: '200', data: id });

  } catch (e) {
    console.log(e);
    res.send({ status: '404', data: 'Internal Server Error' })
  }
})

app.post('/group/delete/:id', async (req, res) => {
  let grp_id = req.params.id;
  let { token } = req.body

  let group_info = await getGroupDetails(grp_id)
  let user_ids = group_info.user_ids;
  let authUser = false;
  for (const id of user_ids) {
    authUser = authUser || verifyLoginUser(id, token);
  };
  if (!authUser) {
    return res.send({ status: '400', data: 'Unauthorized access!' });
  }

  try {
    // Delete all expenses in the group
    let exp_ids = group_info.exp_ids;
    await Expense.deleteMany({ id: { $in: exp_ids } });
    await Group.deleteOne({ id: grp_id });
    res.send({ status: '200', data: group_info });
  } catch (e) {
    console.log(e);
    res.send({ status: '404', data: 'Internal Server Error!' })
  }
})

app.post('/expense/delete/:id', async (req, res) => {
  console.log('Inside /expense/delete', req.body)
  const exp_id = req.params.id;
  const { token } = req.body;

  const expense_details = await Expense.findOne({ id: exp_id })
  const grp_id = expense_details.grp_id;

  const group_info = await getGroupDetails(grp_id);
  const user_ids = group_info.user_ids;
  let authUser = false;
  for (const id of user_ids) {
    authUser = authUser || verifyLoginUser(id, token);
  };
  if (!authUser) {
    return res.send({ status: '400', data: 'Unauthorized access!' });
  }

  try {
    // Delete expense from Group.
    await Group.updateOne({ id: grp_id }, {
      $pull: {
        exp_ids: exp_id
      }
    });

    // Delete the expense 
    await Expense.deleteOne({ id: exp_id });
    res.send({ status: '200', data: expense_details })
  } catch (e) {
    console.log(e);
    res.send({ status: '404', data: 'Internal Server Error!' })
  }

})

// Get the group details along with participants info 
app.get('/group/:id', async (req, res) => {
  let grp_id = req.params.id;
  let token = req.cookies.token;

  let group_deets = await getGroupDetails(grp_id);
  let user_ids = group_deets.user_ids;
  let authUser = false;
  for (const id of user_ids) {
    authUser = authUser || verifyLoginUser(id, token);
  };
  if (!authUser) {
    return res.send({ status: '400', data: 'Unauthorized access!' });
  }

  res.send({ status: '200', data: group_deets });
})

// Create a group
app.post('/group/create', async (req, res) => {
  const { owner, type, name, email_ids, token } = req.body;
  let isVerify = verifyLoginUser(owner, token);
  if (!isVerify) {
    return res.send({ status: '400', data: 'Unauthorized access' });
  }

  try {
    let grp_id = randomstring.generate({
      length: 12,
      charset: 'alphanumeric'
    });

    // convert email ids to user ids 
    let user_ids = await getUserIDsForEmailIDs(email_ids);

    await Group.create({
      id: grp_id,
      owner: owner,
      type: type,
      name: name,
      user_ids: user_ids,
      exp_ids: []
    })

    // Update groups for the User 
    if (type == "personal") {
      await User.updateOne({ id: owner }, {
        $set: {
          personal_exp: grp_id
        }
      })
    } else {
      for (const user of user_ids) {
        await User.updateOne({ id: user }, {
          $push: {
            group_exp: grp_id
          }
        });
      }
    }

    res.send({ status: '200', data: grp_id });
  } catch (e) {
    console.log(e);
    res.send({ status: '404', data: 'Internal Server Error' })
  }

})

// Add a member to the group 
app.post('/group/add-member', async (req, res) => {
  const { member_id, grp_id, user_id, token } = req.body;

  let isVerify = verifyLoginUser(user_id, token);
  if (!isVerify) {
    return res.send({ status: '200', data: 'Unauthorized access' });
  }

  let group_info = await getGroupDetails(grp_id)
  let result = await getUserIDsForEmailIDs([member_id]);
  group_info.user_ids.push(result[0]);

  try {
    await Group.updateOne({ id: grp_id }, {
      $set: {
        user_ids: group_info.user_ids
      }
    });
    res.send({ status: '200', data: 'Successfully added a member' })
  } catch (e) {
    res.send({ status: '404', data: 'Internal Server Error' })
  }

});

// Add an expense to a group
app.post('/group/add-expense', async (req, res) => {
  console.log('/group/add-expense', req.body);
  const { owner, grp_id, type, member_costs, total_cost, title, description, category, token } = req.body;

  let isVerify = verifyLoginUser(owner, token)
  if (!isVerify) {
    return res.send({ status: '400', data: 'Unauthorized user' })
  }

  try {
    // Create an expense 
    let expense_id = randomstring.generate({
      length: 12,
      charset: 'alphanumeric'
    })

    // Add that expense to a group
    let group_details = await getGroupDetails(grp_id);

    if (!group_details) {
      return res.send({ status: '400', data: 'No valid group information available!' });
    }

    //validation on total_cost 
    let sum = 0;
    Object.keys(member_costs).forEach(user => {
      if (member_costs[user] < 0) {
        sum = sum + (member_costs[user] * -1);
      } else {
        sum = sum + member_costs[user];
      }
    })
    if (sum != total_cost) {
      return res.send({ status: '400', data: 'Total costs and individual costs mismatch' })
    }

    let new_expense = {};
    Object.keys(member_costs).forEach(member => {
      new_expense[member] = member_costs[member]
      console.log(new_expense);
    });
    console.log(new_expense)
    await Expense.create({
      id: expense_id,
      grp_id: grp_id,
      type: type,
      total_cost: total_cost,
      memberShare: new_expense,
      title: title,
      description: description,
      category: category,
      owner: owner
    });

    console.log("Successfully created an expense! Mapping it to groups...")

    // update the expense to group document 
    await Group.updateOne({ id: grp_id }, {
      $push: {
        exp_ids: expense_id
      }
    })
    console.log('Sucessfully added the expenditure to the group!');
    res.send({ status: '200', data: expense_id });

  } catch (e) {
    console.log(e);
    res.send({ status: '404', data: 'Internal Server Error' })
  }
})

// User related operations
app.post('/register', async (req, res) => {
  console.log('Inside /register');
  const { name, email, phone_no, password } = req.body;
  // Check if email ID exists already
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.send({ status: '400', data: 'User already exists' })
  }

  // Create a random id for personal expenditure
  let personal_grp_id = randomstring.generate({
    length: 12,
    charset: 'alphanumeric'
  });

  // Create user ID
  let user_id = randomstring.generate({
    length: 12,
    charset: 'alphanumeric'
  });

  // Create user in the DB
  // let hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      id: user_id,
      email: email,
      name: name,
      phone_no: phone_no,
      password: password,
      personal_exp: personal_grp_id,
      group_exp: []
    });
    res.send({ status: '200', data: user_id });
  } catch (e) {
    console.log(e);
    res.send({ status: '404', data: 'Internal server error' });
  }

});

app.post('/login', async (req, res) => {
  console.log('Inside /login');
  const { email, password } = req.body;

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    let storedPassword = oldUser.password;
    // let isSame = await bcrypt.compare(storedPassword, password);
    if (storedPassword != password) {
      return res.send({ status: '400', data: 'Unauthorized access!' });
    }
    let token = jwt.sign({ user_id: oldUser.id }, JWT_SECRET);
    res.send({ status: '200', data: { id: oldUser.id, token: token } });
  } else {
    res.send({ status: '404', data: 'User not found!' });
  }
});

app.post('/delete-user', async (req, res) => {
  const { user_id, token } = req.body;

  const verifiedUser = verifyLoginUser(user_id, token);
  if (!verifiedUser) {
    return res.send({ status: '400', data: 'Unauthorized user!' });
  }

  try {
    await User.deleteOne({ email: email });
    res.send({ status: '200', data: 'Successfully deleted user' });
  } catch (e) {
    res.send({ status: '404', data: 'Internal Server Error!' });
  }
})

app.post('/update-user', async (req, res) => {
  const { name, user_id, phone_no, profile_pic, group_exp, token } = req.body;

  let verifiedUser = verifyLoginUser(user_id, token);
  if (!verifiedUser) {
    return res.send({ status: '400', data: 'Unauthorized access!' });
  }

  let data = {}

  if (name) {
    data.name = name;
  }
  if (phone_no) {
    data.phone_no = phone_no;
  }
  if (profile_pic) {
    data.profile_pic = profile_pic;
  }
  if (group_exp) {
    data.group_exp = group_exp;
  }

  try {
    await User.updateOne({ email: email }, {
      $set: data
    })
    res.send({ status: '200', data: 'User updated successfully' });
  } catch (e) {
    console.log(e);
    res.send({ status: '404', data: 'Internal server error!' });
  }
})

app.get('/user/:id', async (req, res) => {
  let user_id = req.params.id;
  let token = req.cookies.token;

  let isVerify = verifyLoginUser(user_id, token);
  if (!isVerify) {
    return res.send({ status: '400', data: 'Unauthorized access!' })
  }
  let user_info = await getUserDetails(user_id);
  res.send({ status: '200', data: user_info });
});

app.get('/', () => {
  return "Hello world";
})

app.listen('5001', () => {
  console.log('Server started - Lo and behold!');
})