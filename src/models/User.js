import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  info: Object,
  loginType: Number,
  createdAt: Number
}, {
  strict: true
})

class User {
  constructor (user) {
    this.User = mongoose.model('User', userSchema)
  }

  // add a user to db.
  add (user) {
    let newUser = new this.User(user)
    return newUser.save()
  }

  exists (email) {
    return this.User.findOne({ email })
  }

  findUser (obj, select) {
    return this.User.findOne(obj, select)
  }

  deleteByEmail (email) {
    return this.User.findOneAndRemove({ email })
  }
}

export default User
