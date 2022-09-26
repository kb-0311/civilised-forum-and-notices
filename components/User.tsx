import { Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'

type Props={
    name:string,
    isResult:boolean,
    resultDetails : resultDetails |null
}

type resultDetails ={
  resultUsername : string|null,
  resultID :Number|null,
  resultTitle:string|null
}
function User({name , isResult , resultDetails }:Props) {
  return (
    <div className='homeUser'>
        <Avatar seed={name}/>
        <Typography>{name}</Typography>
        {
          isResult? (
            <div>
              <Link href={`/post/${resultDetails?.resultID}`}>
                {resultDetails?.resultTitle}
              </Link>
            </div>
          ) : null
        }
    </div>
  )
}

export default User
