import { useMutation } from '@apollo/client'
import { TrashIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React from 'react'
import toast from 'react-hot-toast'
import ReactTimeago from 'react-timeago'
import { DELETE_COMMENT } from '../Queries/mutations'
import { GET_COMMENTS_BY_POST_ID, GET_POST } from '../Queries/queries'
import Avatar from './Avatar'

type Props = {
    comment : postComment
}
function Comment({comment}:Props) {

    const {data :session} = useSession();

    const [deleteComment] = useMutation(DELETE_COMMENT);

    const deleteCommentHandler = async (commentId:number) =>{

      const notification = toast.loading('Deleting Comment...');

      try {

       

        await deleteComment ({
          refetchQueries:[{query:GET_POST ,variables: {
            id: comment?.post_id,
          },}],
          awaitRefetchQueries:true
        })

        toast.success('Comment successfully Deleted!', {
          id: notification,
        })

      } catch (error) {
        toast.error(`uh oh ! ${error} `, {
          id: notification,
          duration: 4000,
        })
      }
      
      
    } 

  return (
    <div
    className="relative flex items-center space-x-2 space-y-5"
    key={comment?.id}
    >
    {/* <hr className="absolute top-10 left-7 z-0 h-16 border" /> */}
    <div className="z-50">
      <Avatar seed={comment?.username} />
    </div>

    <div className="flex flex-col">
      <p className="text-x2 py-2 text-gray-400">
        <span className="font-semibold text-gray-600">
          {comment?.username}
        </span>{' '}
        • <ReactTimeago date={comment?.created_at} />
      </p>
      <p>{comment?.text}</p>
    </div>
    {
        comment?.username==session?.user?.name ?
        (<div className='flex '>
            <TrashIcon onClick={()=>deleteCommentHandler(comment?.id)} className="icon items-end justify-end' md:h-4 lg:h-6  h-2 text-orange-500 hover:text-red-600 transition-all duration-500"/>
        </div>
        ) : (
            null
        )

    }
    
  </div>
  )
}

export default Comment