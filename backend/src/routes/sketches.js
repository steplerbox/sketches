const express = require('express');

const { Sketch, validate } = require('../models/sketch');

const router = express.Router();

router.get('/', async (req, res) => {
  const sketches = await Sketch.find();
  res.send(sketches);
});

router.get('/:id', async (req, res) => {
  const sketch = await Sketch.findById(req.params.id);

  if (!sketch) {
    return res.status(404).send('Not found');
  }

  res.send(sketch);
});

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  let sketch = new Sketch(req.body);

  sketch = await sketch.save();
  res.send(sketch);
});

router.put('/:id', async (req, res) => {
  const {error} = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  const sketch = await Sketch.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!sketch) {
    return res.status(404).send('Not found');
  }

  res.send(sketch);
});

router.delete('/:id', async (req, res) => {
  const sketch = await Sketch.findByIdAndRemove(req.params.id);

  if (!sketch) {
    return res.status(404).send('Not found');
  }

  res.send(sketch);
});

module.exports = router;
