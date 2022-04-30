import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RootPage from './RootPage'
import userEvent from '@testing-library/user-event'
import MockData from '../../__fixtures__/search-users.json'

const API_URL = process.env.REACT_APP_API_URL

const server = setupServer(
  rest.get(API_URL + '/search/users', (req, res, ctx) => {
    return res(ctx.json(MockData))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays no results found', async () => {
  render(<RootPage />)

  screen.getByText('No results found')
})
test('search users by username and list on the table with autofocus', async () => {
  server.use(
    rest.get(API_URL + '/search/users', (req, res, ctx) => {
      return res(ctx.json(MockData))
    }),
  )

  render(<RootPage />)
  userEvent.type(screen.getByPlaceholderText('Search Users'), 'rabbani')
  fireEvent.click(screen.getByRole('search'))
  await screen.findByText('akifrabbani')
})

test('pagination on table and sorting', async () => {
  render(<RootPage />)

  userEvent.type(screen.getByPlaceholderText('Search Users'), 'rabbani')
  fireEvent.click(screen.getByRole('search'))
  await screen.findByRole('progressbar')

  await screen.findByRole('link', { name: /akifrabbani/i })
  await screen.findByText(/1–9 of 582/i)

  fireEvent.click(await screen.findByTitle(/go to next page/i))
  await screen.findByRole('progressbar')

  await screen.findByText(/10–18 of 582/i)

  let allLogin = await screen.findAllByRole('login')
  let first = allLogin[0].textContent

  expect(first).toBe('akifrabbani')

  fireEvent.click(
    screen.getByRole('button', {
      name: /login/i,
    }),
  )

  allLogin = await screen.findAllByRole('login')
  first = allLogin[0].textContent
  const last = allLogin[allLogin.length - 1].textContent

  expect(first).toBe('wwwiretap')
  expect(last).toBe('akifrabbani')

  fireEvent.click(await screen.findByTitle(/go to prev/i))
  allLogin = await screen.findAllByRole('login')
  first = allLogin[0].textContent
  expect(first).toBe('akifrabbani')
  await screen.findByText(/1–9 of 582/i)
})

test('handles server error', async () => {
  server.use(
    rest.get(API_URL + '/search/users', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  render(<RootPage />)
  userEvent.type(screen.getByPlaceholderText('Search Users'), 'rabbani')
  fireEvent.click(screen.getByRole('search'))
  await screen.findByRole('alert')
})
