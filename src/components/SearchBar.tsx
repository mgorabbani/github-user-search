import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

type SearchBarProps = {
  submitValue: (value: string) => void
}

const SearchBar = ({ submitValue }: SearchBarProps) => {
  const [value, setValue] = React.useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value.trim()) {
      return
    }

    submitValue(value)
  }
  return (
    <Paper component='form' onSubmit={handleSubmit}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search Users'
        value={value}
        autoFocus
        onChange={handleChange}
      />
      <IconButton type='submit' sx={{ p: '10px' }} aria-label='search' role='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
