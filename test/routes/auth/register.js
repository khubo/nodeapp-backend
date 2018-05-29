import test from 'ava'
import superTest from 'supertest'
import app from '../../../src/app'
import User from '../../../src/models/User'

const request = superTest(app.callback())
const url = '/api/auth/register'

let user1 = {
  email: 'test@flinter.it',
  password: 'randompassword',
  confirmPassword: 'randompassword'
}

let user2 = {
  email: 'testuser@flinter.it',
  password: 'random',
  confirmPassword: 'secretasdf'
}

let user3 = {
  email: 'tester',
  password: 'funny_password',
  confirmPassword: 'funny_password'
}

let user4 = {
  email: 'user@flinter.it',
  password: 'strongpassword',
  confirmPassword: 'strongpassword'
}

let user5 = {
  email: 'user5@flinter.it',
  password: 'strongpassword',
  confirmPassword: 'unmatchedPassword'
}

test('# User signup', async t => {
  let res = await request.post(url).send(user1).expect(200)
  t.truthy(res.body.token)
  res = await request.post(url).send(user1).expect(409)
  t.is(res.text, 'email already in use')
  res = await request.post(url).send(user2).expect(400)
  t.is(res.text, 'child "password" fails because ["password" length must be at least 8 characters long]')
  res = await request.post(url).send(user3).expect(400)
  t.is(res.text, 'child "email" fails because ["email" must be a valid email]')
  res = await request.post(url).send(user5).expect(400)
  t.is(res.text, 'child "confirmPassword" fails because ["confirmPassword" must be one of [ref:password]]')
})

test('# verify db values in user sign up', async t => {
  let user = new User()
  await request.post(url).send(user4).expect(200)
  let newUser = await user.exists(user4.email)
  t.truthy(newUser)
  t.is(newUser.email, user4.email)
  t.is(newUser.loginType, 1)
  t.is(typeof (newUser.createdAt), 'number')
})

test.after.always('cleanup', async t => {
  let user = new User()
  await user.deleteByEmail(user1.email)
  await user.deleteByEmail(user4.email)
})
