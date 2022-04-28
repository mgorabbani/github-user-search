import {
  Alert,
  Box,
  Container,
  Grid,
  Slide,
  SlideProps,
  CircularProgress,
  Snackbar,
} from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import ResultView, { User } from '../../components/ResultView'
import SearchBar from '../../components/SearchBar'
import { getSearchUser } from '../../utils/api'

type SearchResponse = {
  incomplete_results: boolean
  items: Array<User>
  total_count: number
}

function RootPage() {
  const [results, setResults] = React.useState<SearchResponse>()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState()
  const [page, setPage] = React.useState(1)
  const [searchTerm, setSearchTerm] = React.useState('')

  const searchUser = useCallback(async () => {
    setLoading(true)
    setError(undefined)
    try {
      const data = await getSearchUser({ login: searchTerm, page })
      setResults(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [page, searchTerm])

  const handleValue = async (login: string) => {
    setSearchTerm(login)
  }

  const handleChangePage = async (newPage: number) => {
    setPage(newPage + 1)
  }

  useEffect(() => {
    if (searchTerm) {
      searchUser()
    }
  }, [searchTerm, searchUser, page])

  return (
    <Container maxWidth='sm' style={{ marginTop: 8 }}>
      <Grid container spacing={[2]} direction='column' alignItems='center'>
        <Grid item xs={12}>
          <SearchBar submitValue={handleValue} />
        </Grid>

        <Grid item xs={12}>
          {loading ? (
            <Box sx={{ width: '100%', height: '30px' }}>
              <CircularProgress />
            </Box>
          ) : (
            <ResultView
              data={results?.items || []}
              currentPage={page}
              handleChangePage={handleChangePage}
              totalCount={results?.total_count || 0}
            />
          )}
        </Grid>
      </Grid>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        TransitionComponent={(props: SlideProps) => <Slide {...props} direction='up' />}
      >
        <Alert severity='error' sx={{ width: '100%' }} role='alert'>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default RootPage
