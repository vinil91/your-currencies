const {Router} = require('express');
const Currency = require('../models/Currency');
const auth = require('../middleware/auth.middleware');
const config = require('config')
const router = Router();

router.post('/generate', auth, async (req, res) => {
  try {
    console.log('generate')

    const currency = new Currency({
      owner: req.user.userId, descriptionId: req.body.descriptionId
    })

    await currency.save();

    res.status(201).json({ currency })

  } catch (e) {
    res.status(500).json({ message: 'Что-то опять пошла не так'});
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const currencys = await Currency.find({ owner: req.user.userId });
    res.json(currencys);
  } catch (e) {
    res.status(500).json({ message: 'Что-то опять пошла не так'});
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const currencys = await Currency.findById(req.params.id);
    res.json(currencys);
  } catch (e) {
    res.status(500).json({ message: 'Что-то опять пошла не так'});
  }
})

module.exports = router