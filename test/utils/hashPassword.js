import test from 'ava'
import { hashPassword, comparePassword } from '../../src/utils/hashPassword'

test('# Password hash function', async t => {
  let password = 'randompassword'
  let hash = await hashPassword(password)
  let result = await comparePassword(password, hash)

  t.is(result, true)

  result = await comparePassword(password, hash.slice(1))
  t.is(result, false)
})
