import { TableCell, TableRow } from '@mui/material'
import React, { FC } from 'react'
import { User } from '../types'

interface UserRowProps {
  user: User
}

const UserRow: FC<UserRowProps> = (props) => {
  const { user } = props

  return (
    <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component='th' scope='row' role='login'>
        <a href={user.html_url}>{user.login}</a>
      </TableCell>

      <TableCell align='right'>{user.type}</TableCell>
      <TableCell align='right'>
        <img src={user.avatar_url} alt={user.login} height={50} />
      </TableCell>
    </TableRow>
  )
}

export default UserRow
