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
import React, { useCallback, useEffect, useState } from 'react'
import Results from '../../components/Results'
import SearchBar from '../../components/SearchBar'
import { UserResponse } from '../../types'
import { getSearchUser } from '../../utils/api'

function RootPage() {
  const [results, setResults] = useState<UserResponse>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const searchUser = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getSearchUser({ login: searchTerm, page })
      setResults(data)
      setError(undefined)
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
            <Results
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
