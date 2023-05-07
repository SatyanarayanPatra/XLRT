const express = require('express');
const VillainModel = require('../model/villain.model');
const Router = express.Router;

const villainRoute = Router();

villainRoute.get('/', async (req, res) => {
  try {
    const villains = await VillainModel.find(req.query);
    res.send(villains);
  } catch (error) {
    console.log('Error in getting villains');
    console.error(error);
    res.send('Error in getting villains');
  }
});

villainRoute.post('/add', async (req, res) => {
  try {
    const villain = new VillainModel(req.body);
    await villain.save();
    res.send('villain added to the db');
  } catch (error) {
    console.log('Error in adding new villain');
    console.error(error);
    res.send('Error in adding villain to the db');
  }
});

villainRoute.patch('/edit/:id', async (req, res) => {
  try {
    const ID = req.params.id;
    await VillainModel.findByIdAndUpdate(ID, req.body);
    res.send('villain data changed');
  } catch (error) {
    console.log('Error in updating the villain');
    console.error(error);
    res.send('Error in updating the villain');
  }
});

villainRoute.delete('/delete/:id', async (req, res) => {
  try {
    const ID = req.params.id;
    await VillainModel.findByIdAndDelete(ID, req.body);
    res.send('villain data deleted');
  } catch (error) {
    console.log('Error in deleting villain');
    console.error(error);
    res.send('Error in deleting villain');
  }
});

module.exports = villainRoute;
