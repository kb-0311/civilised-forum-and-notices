import { Typography } from '@mui/material'
import React from 'react'
import Avatar from './Avatar'

type Props={
    name:string
}
function User({name}:Props) {
  return (
    <div className='homeUser'>
        <Avatar seed={name}/>
        <Typography>{name}</Typography>
    </div>
  )
}

export default User
