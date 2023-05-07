const express = require('express');
const HeroModel = require('../model/hero.model');
const Router = express.Router;

const heroRoute = Router();

heroRoute.get('/', async (req, res) => {
  try {
    const heroes = await HeroModel.find(req.query);
    res.send(heroes);
  } catch (error) {
    console.log('Error in getting heroes');
    console.error(error);
    res.send('Error in getting heroes');
  }
});

heroRoute.post('/add', async (req, res) => {
  try {
    // console.log(req.body);
    const hero = new HeroModel(req.body);
    await hero.save();
    // console.log(hero);
    res.send('hero added to the db');
  } catch (error) {
    console.log('Error in adding new hero');
    console.error(error);
    res.send('Error in adding hero to the db');
  }
});

heroRoute.patch('/edit/:id', async (req, res) => {
  try {
    const ID = req.params.id;
    await HeroModel.findByIdAndUpdate(ID, req.body);
    res.send('hero data changed');
  } catch (error) {
    console.log('Error in updating the hero');
    console.error(error);
    res.send('Error in updating the hero');
  }
});

heroRoute.delete('/delete/:id', async (req, res) => {
  try {
    const ID = req.params.id;
    await HeroModel.findByIdAndDelete(ID, req.body);
    res.send('hero data deleted');
  } catch (error) {
    console.log('Error in deleting hero');
    console.error(error);
    res.send('Error in deleting hero');
  }
});

module.exports = heroRoute;
