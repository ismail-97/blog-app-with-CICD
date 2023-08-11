/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  }],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
