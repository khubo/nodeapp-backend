import test from 'ava'
import superTest from 'supertest'
import app from '../../../src/app'
import User from '../../../src/models/User'

const request = superTest(app.callback())
const logoutUrl = '/api/auth/logout'
const restrictedUrl = '/api/test'
const registerUrl = '/api/auth/register'

let registerUser1 = {
  email: 'logout@flinter.it',
  password: 'randomPassword',
  confirmPassword: 'randomPassword'
}

let user1 = {
  email: 'logout@flinter.it',
  password: 'randompassword'
}

test('# User logout', async t => {
  let res = await request.post(registerUrl).send(registerUser1).expect(200)
  let { token } = res.body
  res = await request.get(restrictedUrl).set('authorization', `Bearer ${token}`).send().expect(200)
  t.is(res.body.message, 'route is accessible')
  res = await request.get(logoutUrl).set('authorization', `Bearer ${token}`).send().expect(200)
  res = await request.get(restrictedUrl).set('authorization', `Bearer ${token}`).send().expect(401)
  t.is(res.text, 'authorization token is invalid')
})

test.after.always('cleanup', async t => {
  let user = new User()
  await user.deleteByEmail(user1.email)
})
