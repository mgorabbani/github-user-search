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
  server.use(
    rest.get(API_URL + '/search/users', (req, res, ctx) => {
      return res(ctx.json({ total_count: 0, items: [] }))
    }),
  )

  render(<RootPage />)
  userEvent.type(screen.getByPlaceholderText('Search Users'), 'usernamedoesnotexist')
  fireEvent.click(screen.getByRole('search'))

  expect(await screen.findByText('No results found')).toBeInTheDocument()
})

test('search users by username and list on the table with autofocus', async () => {
  render(<RootPage />)
  userEvent.type(screen.getByPlaceholderText('Search Users'), 'rabbani')
  fireEvent.click(screen.getByRole('search'))
  await screen.findByText('akifrabbani')
})

test('results pagination next and previous', async () => {
  render(<RootPage />)

  userEvent.type(screen.getByPlaceholderText('Search Users'), 'rabbani')
  fireEvent.click(screen.getByRole('search'))
  await screen.findByRole('progressbar')

  await screen.findByRole('link', { name: /mgorabbani/i })
  await screen.findByText(/1–9/i)

  fireEvent.click(await screen.findByTitle(/go to next page/i))
  await screen.findByRole('progressbar')

  await screen.findByText(/10–18/i)
  // could be better if i mocked the api for next pagination i think
  fireEvent.click(await screen.findByTitle(/go to prev/i))

  await screen.findByText(/1–9/i)
  await screen.findByRole('link', { name: /akifrabbani/i })
})

test('results sort by username', async () => {
  render(<RootPage />)

  userEvent.type(screen.getByPlaceholderText('Search Users'), 'rabbani')
  fireEvent.click(screen.getByRole('search'))
  await screen.findByRole('progressbar')

  let allLogin = await screen.findAllByRole('login')
  let first = allLogin[0].textContent

  expect(first).toBe('akifrabbani')

  fireEvent.click(screen.getByRole('username-header'))

  allLogin = await screen.findAllByRole('login')
  first = allLogin[0].textContent
  const last = allLogin[allLogin.length - 1].textContent

  expect(first).toBe('wwwiretap')
  expect(last).toBe('akifrabbani')
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
