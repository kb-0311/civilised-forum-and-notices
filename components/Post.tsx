import { useSession } from 'next-auth/react'
import React, { useState } from 'react'




type Props = {
    post: Posts
  }

function Post({ post }: Props) {

    const [vote, setVote] = useState<boolean>()
    const { data: session } = useSession()
  return (
    <div>Post</div>
  )
}

export default Post