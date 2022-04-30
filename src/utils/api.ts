import axios from 'axios'

export const API_URL = process.env.REACT_APP_API_URL

interface Params {
  login: string
  page: number
  perPage?: number
}

export const getSearchUser = async (params: Params) => {
  const { login, page = 1, perPage = 9 } = params
  const { data } = await axios.get(`${API_URL}/search/users`, {
    params: {
      q: login,
      page,
      per_page: perPage,
    },
  })

  return data
}
