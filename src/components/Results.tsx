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
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

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
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

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
      <TableContainer
        sx={{
          height: 500,
          width: 600,
          [matches ? 'maxWidth' : 'width']: '100%',
        }}
      >
        <Table aria-label='table' size='small' stickyHeader>
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
      </TableContainer>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[9]}
        component='div'
        count={totalCount}
        rowsPerPage={9}
        page={currentPage - 1}
        onPageChange={(event, page) => handleChangePage(page)}
      />
    </Paper>
  )
}
