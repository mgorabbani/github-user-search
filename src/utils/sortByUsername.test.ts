import { sortByUsername } from './sortByUsername'

const users = [{ login: 'b' }, { login: 'a' }, { login: 'c' }]
test('Sort by username by asc order', () => {
  const sortedUsers = sortByUsername(users as any, 'asc')
  expect(sortedUsers[0].login).toBe('a')
  expect(sortedUsers[1].login).toBe('b')
  expect(sortedUsers[2].login).toBe('c')
})

test('Sort by username by desc order', () => {
  const sortedUsers = sortByUsername(users as any, 'desc')
  expect(sortedUsers[0].login).toBe('c')
  expect(sortedUsers[1].login).toBe('b')
  expect(sortedUsers[2].login).toBe('a')
})
