import axios from 'axios'

// move it to config
export const API_URL = 'https://api.github.com/search/'

export const searchUser = async ({
  login,
  page = 1,
  perPage = 9,
}: {
  login: string
  page: number
  perPage?: number
}) => {
  const { data } = await axios.get(`${API_URL}users`, {
    params: {
      q: login,
      page,
      per_page: perPage,
    },
  })

  return data
}