import { ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'


type Props = {
    index: number
    topic: string
  }

function TopicRow({ index, topic }: Props) {

    let thisTopic = topic.toLowerCase();
  return (
    <div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b">
      <p>{index + 1}</p>
      <Avatar seed={String(topic.toLowerCase())} />
      <p className="flex-1 truncate">{topic}</p>
      <Link href={`/topic/${String(topic)}`}>
        <div className="cursor-pointer rounded-full bg-orange-500 px-3 text-white">
          View
        </div>
      </Link>
    </div>
  )
}

export default TopicRow