import React from 'react'
import ReactTimeago from 'react-timeago'
import Avatar from './Avatar'

type Props = {
    comment : postComment
}
function CommentList({comment}:Props) {
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
  </div>
  )
}

export default CommentList