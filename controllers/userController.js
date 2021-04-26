const userModel = require('../models/userModel');

async function postOne(req, res) {
  try {
    let newUser = await userModel.postOne(req.body);
    console.log('newuser', newUser)
    !newUser ? res.status(404).send(`Unable to add user`) : res.status(201).send(`Added ${newUser}`);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function getOne(req, res) {
  try {
    let user = await userModel.getOne(req.params.email);
    console.log('user', user)
    user.length === 0 ? res.status(404).send(`Unable to get user`) : res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function deleteAll(req, res) {
  try {
    let deleted = await userModel.deleteAll();
    !deleted ? res.status(404).send(`Unable to delete users`) : res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

module.exports = { postOne, getOne, deleteAll };