import { useMutation, useQuery } from '@apollo/client';
import { Jelly } from '@uiball/loaders';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactTimeago from 'react-timeago';
import Avatar from '../../components/Avatar';
import CommentList from '../../components/CommentList';
import Post from '../../components/Post';
import { ADD_COMMENT } from '../../Queries/mutations';
import { GET_POST } from '../../Queries/queries';

type FormData = {
    comment: string
  }

function PostPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FormData>()

    const { data  ,loading ,error  } = useQuery(GET_POST, {
        variables: {
          id: router.query.postId,
        },
      })
    
    const [addComment] = useMutation(ADD_COMMENT);

    
    const post: Posts = data?.getPost;
      
    const onSubmit: SubmitHandler<FormData> = async ({comment}) => {
        const notification = toast.loading('Posting your comment...')
        await addComment({
            variables: {
              post_id: router.query.postId,
              username: session?.user?.name,
              text: comment,
            },
            refetchQueries:[{query:GET_POST ,variables: {
                id: router.query.postId,
              },}],
            awaitRefetchQueries:true
          })
        setValue('comment', '')
        

        toast.success('Comment successfully posted!', {
          id: notification,
        })
    }

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

        <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
            <p className="text-sm">
            Comment as <span className="text-orange-600">{session?.user?.name}</span>
            </p>
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-2"
        >
            <textarea
            {...register('comment')}
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? 'What are your thoughts?' : 'Please sign in to comment'
            }

            
            />

          <button
            type="submit"
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
          >
            Comment
          </button>

        </form>

        <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
        {/* <hr className="py-2" /> */}
        {post?.commentList.map((comment) => (
          <CommentList comment={comment}/> 
        ))}
      </div>
        </div>

        

    </div>
  )
}

export default PostPage