import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Divider, TablePagination, TableSortLabel, Typography } from '@mui/material'

export type User = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
}

type Order = 'asc' | 'desc'

export default function ResultView({
  data,
  totalCount,
  currentPage,
  handleChangePage,
}: {
  data: User[]
  totalCount: number
  currentPage: number
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => void
}) {
  const [order, setOrder] = React.useState<Order>('asc')

  const handleSort = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  function sortByLogin(a: User, b: User) {
    if (order === 'asc') {
      return a.login.localeCompare(b.login)
    } else {
      return b.login.localeCompare(a.login)
    }
  }

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active={true} direction={order} onClick={handleSort}>
                  Login
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>Type</TableCell>
              <TableCell align='right'>Avatar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalCount === 0 && (
              <TableRow>
                <TableCell>
                  <Typography>No results found</Typography>
                </TableCell>
              </TableRow>
            )}
            {data.sort(sortByLogin).map((user) => (
              <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  <a href={user.html_url}>{user.login}</a>
                </TableCell>

                <TableCell align='right'>{user.type}</TableCell>
                <TableCell align='right'>
                  <img src={user.avatar_url} alt={user.login} height={50} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider />
        <TablePagination
          rowsPerPageOptions={[9]}
          component='div'
          count={totalCount}
          rowsPerPage={9}
          page={currentPage - 1}
          onPageChange={handleChangePage}
        />
      </TableContainer>
    </Paper>
  )
}
