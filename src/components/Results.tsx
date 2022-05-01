import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  Box,
  CircularProgress,
  Divider,
  TablePagination,
  TableSortLabel,
  Typography,
} from '@mui/material'
import { Order, User } from '../types'
import UserRow from './UserRow'
import { sortByUsername } from '../utils/sortByUsername'

type Props = {
  data?: User[]
  totalCount: number
  currentPage: number
  loading: boolean
  handleChangePage: (newPage: number) => void
}

export default function Results({
  data,
  totalCount,
  currentPage,
  handleChangePage,
  loading,
}: Props) {
  const [order, setOrder] = useState<Order>('asc')

  const handleSort = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  if (loading) {
    return (
      <Box sx={{ width: '100%', height: '30px' }}>
        <CircularProgress />
      </Box>
    )
  }
  if (!data) {
    return null
  }

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label='table' size='small'>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active
                  direction={order}
                  onClick={handleSort}
                  role='username-header'
                >
                  Username
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>Type</TableCell>
              <TableCell align='right'>Avatar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!totalCount && (
              <TableRow>
                <TableCell>
                  <Typography>No results found</Typography>
                </TableCell>
              </TableRow>
            )}

            {sortByUsername(data, order).map((user: User) => (
              <UserRow key={user.id} user={user} />
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
          onPageChange={(event, page) => handleChangePage(page)}
        />
      </TableContainer>
    </Paper>
  )
}
