import { ArrowDownIcon, ArrowUpIcon, ChatAltIcon, ExclamationCircleIcon, ShareIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_VOTE } from '../Queries/mutations'
import { GET_ALL_VOTES_BY_POST_ID } from '../Queries/queries'


type Props = {
    post: Posts
    created_at:string
  }

function Post({ post ,created_at }: Props) {
  
    const [vote, setVote] = useState<boolean>()
    const { data: session } = useSession();
    const { data:allVotes, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
      variables: {
        post_id: post?.id,
      },
    })
    const [addVote] = useMutation(ADD_VOTE);
    console.log(allVotes?.getVotesByPostId);
    
    
    
    const upVote = async (isUpvote: boolean) => {
      const notification = toast.loading(`voting as ${session?.user?.name}`)

      if (!session) {
        toast("❗ You'll need to sign in to Vote!")
        return
      }
  
      if (vote && isUpvote) return
      if (vote == false && !isUpvote) return
      
      let voted:Boolean = false
      allVotes?.getVotesByPostId.forEach((vote:Vote)=>{
        if (session?.user?.name===vote.username) {
          voted=true;
        }
      })
      if (voted) {
        toast.success(`You can vote only once on a post ` , {
          id:notification,
          icon: '✋',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
        return;
      }
      const {
        data: { insertVote: newVote },
      } = await addVote({
        variables: {
          post_id: post?.id,
          username: session.user?.name,
          upvote: isUpvote,
        }, 
        refetchQueries : [{query : GET_ALL_VOTES_BY_POST_ID , variables :{post_id :post.id}}],
        awaitRefetchQueries:true
      })
      

      toast.success(`Added Vote Succesfully ` , {
        id:notification
      })

    }
  
    const displayVotes = (data: any) => {
      const votes: Vote[] = data?.getVotesByPostId
      const displayNumber = votes?.reduce(
        (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
        0
      )
  
      if (votes?.length === 0) return 0
  
      if (displayNumber === 0) {
        return votes[0]?.upvote ? 1 : -1
      }
  
      return displayNumber
    }
  
  return (
    <div className="flex cursor-pointer rounded-md  shadowshadow-lg border border-red-500 bg-white hover:border hover:border-gray-600">
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-slate-900 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={()=>upVote(true)}
            className={`voteButtons text-white hover:text-red-300 hover:bg-black ${
              vote && 'text-red-400'
            }`}
          />
          <p className="text-xs font-bold text-white">{displayVotes(allVotes)}</p>
          {/* <ArrowDownIcon
            onClick={()=>upVote(false)}
            className={`voteButtons  text-white hover:text-red-300 hover:bg-black ${
              vote === false && 'text-blue-400'
            }`}
          /> */}
      </div>
      <Link href={`/post/${post?.id}`}>

            {/* header */}
      <div className="p-3 pb-1">
              {/* topic */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post?.username} />
            <p className="text-xs text-slate-900">
              <Link href={`/topic/${post?.topic?.topic}`}>
                <span className="font-bold text-lg text-black hover:text-blue-400 hover:underline">
                  {post?.topic?.topic}
                </span>
              </Link>{' '}
              -- {post?.username} <TimeAgo date={created_at} />
            </p>
          </div>

          <div className="py-4 ">
              <h2 className="text-xl font-semibold">{post?.title}</h2>
              <p className="mt-2 text-sm font-light">{post?.body}</p>
          </div>
            {
              post?.media? (
                <img className="w-full" src={post?.media} alt="" />

              ) : (
                null
              )
            }
           <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatAltIcon className="h-6 w-6" />
              <p className="hidden sm:inline">
                {post?.commentList?.length} Comments
              </p>
            </div>
            {/* <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div> */}
            {/* <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div> */}
            {/* <div className="postButtons">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div> */}
          </div>
          

      </div>
      </Link>

            {/* body */}


            {/* footer */}



    </div>      

  )
}

export default Post