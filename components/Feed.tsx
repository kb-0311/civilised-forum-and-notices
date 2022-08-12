import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import client from '../pages/api/apollo-client'
import { GET_ALL_POSTS, GET_ALL_POSTS_IN_A_TOPIC } from '../Queries/queries'
import { Jelly } from '@uiball/loaders'

import Post from './Post'

type Props = {
  topic?: string
}

function Feed ({topic} :Props) {

  const { data , error ,loading } = !topic?  useQuery(GET_ALL_POSTS) :useQuery(GET_ALL_POSTS_IN_A_TOPIC , {variables : {
    topic:topic
  }}) ;

 
  
  const posts:Posts[]=  !topic ? data?.getPostList : data?.getPostListByTopic


  
  // : useQuery(GET_ALL_POSTS_BY_TOPIC, {
  //     variables: {
  //       topic: topic,
  //     },
  //   })

  if(loading) return (
    <div className='flex justify-center items-center my-14'>
    <Jelly 
    size={80}
    speed={0.4} 
    color="black" 
   />
   </div>
  )


  return (
    <div className="mt-20 space-y-12">
    {posts?.map((post) => (
      <Post key={post.id} post={post} created_at={post?.created_at} />
    ))}
  </div>
  )
  
}

export default Feed