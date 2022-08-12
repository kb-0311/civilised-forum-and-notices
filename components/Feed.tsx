import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import client from '../pages/api/apollo-client'
import { GET_ALL_POSTS } from '../Queries/queries'
import { Jelly } from '@uiball/loaders'

import Post from './Post'

type Props = {
  topic?: string
}

function Feed () {

  const { data , error ,loading } =  useQuery(GET_ALL_POSTS);

 
  console.log(data);
  
  const posts:Posts[]=  data?.getPostList


  
  // : useQuery(GET_ALL_POSTS_BY_TOPIC, {
  //     variables: {
  //       topic: topic,
  //     },
  //   })

  if(loading) return (
    <Jelly 
    size={80}
    speed={0.9} 
    color="black" 
   />
  )


  return (
    <div className="mt-5 space-y-4">
    {posts?.map((post) => (
      <Post key={post.id} post={post} />
    ))}
  </div>
  )
  
}

export default Feed