import test from 'ava'
import superTest from 'supertest'
import app from '../../../src/app'
import User from '../../../src/models/User'

const request = superTest(app.callback())
const url = '/api/auth/login'
const registerUrl = '/api/auth/register'

let registerUser1 = {
  email: 'login@flinter.it',
  password: 'randompassword',
  confirmPassword: 'randompassword'
}
let user1 = {
  email: 'login@flinter.it',
  password: 'randompassword'
}

let user2 = {
  email: 'login2@flinter.it',
  password: 'secretpass'
}

let user3 = {
  email: 'login3@flinter.it',
  password: 'funny_password'
}

let user4 = {
  email: 'login4@flinter.it'
}

let user5 = {
  password: 'strongpassword'
}

test('# User login', async t => {
  let res = await request.post(registerUrl).send(registerUser1).expect(200)
  res = await request.post(url).send(user1).expect(200)
  t.truthy(res.body.token)
  res = await request.post(url).send(user2).expect(404)
  t.is(res.text, 'invalid username or password', 'here it also wrong')
  res = await request.post(url).send(user3).expect(404)
  t.is(res.text, 'invalid username or password', 'here it is wrong')
  res = await request.post(url).send(user4).expect(400)
  t.is(res.text, 'child "password" fails because ["password" is required]')
  res = await request.post(url).send(user5).expect(400)
  t.is(res.text, 'child "email" fails because ["email" is required]')
})

test.after.always('cleanup', async t => {
  let user = new User()
  await user.deleteByEmail(user1.email)
})
