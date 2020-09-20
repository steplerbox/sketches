const Mongoose = require('mongoose')
const Joi = require('joi')
const Joigoose = require('joigoose')(Mongoose)

const joiSketchSchema = Joi.object({
  name: Joi.string().required(),
  nodes: Joi.array().items({
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
    n1: Joi.string().required(),
    n2: Joi.string().required()
  })
})

const sketchSchema = new Mongoose.Schema(Joigoose.convert(joiSketchSchema))

sketchSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Sketch = Mongoose.model('Sketch', sketchSchema)

const validate = sketch => {
  return Joi.validate(sketch, joiSketchSchema)
}

module.exports.Sketch = Sketch
module.exports.validate = validate
