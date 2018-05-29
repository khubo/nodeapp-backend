import test from 'ava'
import redis from '../../src/services/redis'
import { generateAuthToken, decodeAuthToken, saveAuthToken, invalidateAuthToken } from '../../src/utils/token'

test('# JWT token', async t => {
  let payload = { name: 'aswin' }

  let token = await generateAuthToken(payload)
  let result = await decodeAuthToken(token)
  t.is(result.name, payload.name)
})

const generateKey = uid => `user:${uid.toString()}:tokens`
const uids = ['51acbdfadf34', '51acbdfadf35']

test('# save auth token', async t => {
  let uid = uids[0]
  let payload = { uid }
  let token = await generateAuthToken(payload)
  await saveAuthToken(uid, token)
  let key = generateKey(uid)
  let score = await redis.zscoreAsync(key, token)
  t.truthy(score)
})

test('# invalidate  auth token', async t => {
  let uid = uids[1]
  let payload = { uid }
  let token = await generateAuthToken(payload)
  await saveAuthToken(uid, token)
  let key = generateKey(uid)
  let score = await redis.zscoreAsync(key, token)
  t.truthy(score)
  await invalidateAuthToken(uid, token)
  score = await redis.zscoreAsync(key, token)
  t.falsy(score)
})

test.after.always('cleanup', async t => {
  for (let uid of uids) {
    redis.delAsync(generateKey(uid))
  }
})
