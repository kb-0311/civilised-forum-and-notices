import { useQuery } from '@apollo/client';
import { Jelly } from '@uiball/loaders';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import React from 'react'
import Post from '../../components/Post';
import { GET_POST } from '../../Queries/queries';

function PostPage() {
    const router = useRouter();
    const { data: session } = useSession();

    const { data  ,loading ,error  } = useQuery(GET_POST, {
        variables: {
          id: router.query.postId,
        },
      })
    
    const post: Posts = data?.getPost;

  if (loading) {
    return(
    <div className='flex justify-center items-center my-14'>
    <Jelly 
    size={80}
    speed={0.4} 
    color="black" 
   />
   </div>)
  }

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} created_at={post?.created_at} />
    </div>
  )
}

export default PostPage