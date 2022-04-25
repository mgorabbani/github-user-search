import { Container, Grid, Pagination, Paper, TablePagination } from '@mui/material'
import React from 'react'
import ResultView from './components/ResultView'
import SearchBar from './components/SearchBar'

function App() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [results, setResults] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState()
  const [page, setPage] = React.useState(0)
  const handleValue = async (value: string) => {
    setLoading(true)
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0)
  }
  return (
    <Container maxWidth='sm' style={{ marginTop: 8 }}>
      <Grid container spacing={[2]} direction='column' alignItems='center'>
        <Grid item xs={12}>
          <SearchBar submitValue={handleValue} />
        </Grid>
        <Grid item xs={12}>
          <ResultView />
          <Paper>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={100}
              rowsPerPage={5}
              page={1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
