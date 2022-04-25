import { Container, Grid, Paper, TablePagination } from '@mui/material'
import React, { useEffect } from 'react'
import ResultView, { User } from './components/ResultView'
import SearchBar from './components/SearchBar'
import { searchUser } from './utils/api'

type UserResponse = {
  incomplete_results: boolean
  items: Array<User>
  total_count: number
}

function App() {
  const [results, setResults] = React.useState<UserResponse>()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState()
  const [page, setPage] = React.useState(0)
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleValue = async (login: string) => {
    setSearchTerm(login)
    setLoading(true)
    try {
      const data = await searchUser({ login, page })
      setResults(data)
      setError(undefined)
    } catch (err: any) {
      setError(err.message)
      console.log('Error fetching and parsing data', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
    try {
      const data = await searchUser({ login: searchTerm, page })
      setResults(data)
    } catch (err: any) {
      setError(err.message)
      console.log('Error fetching and parsing data', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth='sm' style={{ marginTop: 8 }}>
      <Grid container spacing={[2]} direction='column' alignItems='center'>
        <Grid item xs={12}>
          <SearchBar submitValue={handleValue} />
        </Grid>

        {error && (
          <Grid item xs={12}>
            {error}
          </Grid>
        )}
        <Grid item xs={12}>
          {results ? (
            <Paper>
              <ResultView data={results.items} />
              <TablePagination
                rowsPerPageOptions={[9]}
                component='div'
                count={results.total_count}
                rowsPerPage={9}
                page={page}
                onPageChange={handleChangePage}
              />
            </Paper>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
