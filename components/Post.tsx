import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline'
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
    <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
      <ArrowUpIcon
            onClick={()=>alert('hello')}
            className={`voteButtons hover:text-red-300 ${
              vote && 'text-red-400'
            }`}
          />
          <p className="text-xs font-bold text-black">4</p>
          <ArrowDownIcon
            onClick={()=>alert('hello')}
            className={`voteButtons hover:text-blue-300 ${
              vote === false && 'text-blue-400'
            }`}
          />
      </div>

            {/* header */}
      <div className="p-3 pb-1">
              {/* topic */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post?.topic[0]?.topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.topic[0]?.topic}`}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  {post.topic[0]?.topic}
                </span>
              </Link>{' '}
              • Posted by 
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>

      </div>
            {/* body */}
      <div>

      </div>

            {/* footer */}
      <div>

      </div>


    </div>
  )
}

export default Post