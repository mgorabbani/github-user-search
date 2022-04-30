import { Order, User } from '../types'

export const sortByUsername = (data: User[], order: Order) => {
  return data.sort((a: User, b: User) => {
    if (order === 'asc') {
      return a.login.localeCompare(b.login)
    }
    return b.login.localeCompare(a.login)
  })
}
