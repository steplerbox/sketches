const Mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose);

const joiSketchSchema = Joi.object({
  name: Joi.string().required(),
  points: Joi.array().items({
    id: Joi.string().required(),
    x: Joi.number().required(),
    y: Joi.number().required(),
    fixed: Joi.boolean(),
    force: Joi.object({
      x: Joi.number(),
      y: Joi.number()
    })
  }),
  constraints: Joi.array().items({
    p1: Joi.string().required(),
    p2: Joi.string().required()
  })
});

const Sketch = Mongoose.model('Sketch', new Mongoose.Schema(Joigoose.convert(joiSketchSchema)));

const validate = sketch => {
  return Joi.validate(sketch, joiSketchSchema);
};

module.exports.Sketch = Sketch;
module.exports.validate = validate;