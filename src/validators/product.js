import joi from 'joi'

// product schema
export const productSchema = {
  name: joi.string().required(),
  price: joi.number().min(0).required(),
  gst: joi.number().min(0).required()
}
