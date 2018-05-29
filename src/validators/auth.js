import joi from 'joi'

// user login schema
export const loginUserSchema = {
  email: joi.string().required(),
  password: joi.string().required()
}

// user registration schema
export const registerUserSchema = {
  email: joi.string().email().required(),
  password: joi.string().min(8).max(100).required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required()
}
