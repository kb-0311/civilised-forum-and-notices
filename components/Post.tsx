import { ArrowDownIcon, ArrowUpIcon, ChatAltIcon, ShareIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'


type Props = {
    post: Posts
  }

function Post({ post }: Props) {
  
    const [vote, setVote] = useState<boolean>()
    const { data: session } = useSession()
  return (
    <div className="flex cursor-pointer rounded-md  shadowshadow-lg border border-red-500 bg-white hover:border hover:border-gray-600">
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-slate-900 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={()=>alert('hello')}
            className={`voteButtons text-white hover:text-red-300 hover:bg-black ${
              vote && 'text-red-400'
            }`}
          />
          <p className="text-xs font-bold text-white">4</p>
          <ArrowDownIcon
            onClick={()=>alert('hello')}
            className={`voteButtons  text-white hover:text-red-300 hover:bg-black ${
              vote === false && 'text-blue-400'
            }`}
          />
      </div>

            {/* header */}
      <div className="p-3 pb-1">
              {/* topic */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.username} />
            <p className="text-xs text-slate-900">
              <Link href={`/topic/${post.topic.topic}`}>
                <span className="font-bold text-lg text-black hover:text-blue-400 hover:underline">
                  {post.topic.topic}
                </span>
              </Link>{' '}
              -- {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>

          <div className="py-4 ">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>
            {
              post.media? (
                <img className="w-full" src={post.media} alt="" />

              ) : (
                null
              )
            }
           <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatAltIcon className="h-6 w-6" />
              <p className="hidden sm:inline">
                {post.commentList.length} Comments
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
            {/* body */}


            {/* footer */}
      <div>

      </div>


    </div>
  )
}

export default Post