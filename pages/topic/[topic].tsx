import { useRouter } from 'next/router'
import React from 'react'
import Avatar from '../../components/Avatar'
import Feed from '../../components/Feed'
import PostBox from '../../components/PostBox'

function Topic() {

    const {
        query: { topic },
      } = useRouter()

      let topicRen:string = topic as string ||"idk"
      console.log(topicRen);
      
  return (
    <div className={`h-24 bg-red-400 p-8`}>
    <div className="-mx-8 mt-10 bg-white">
      <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
        <div className="-mt-5">
          <Avatar seed={String(topicRen.toLowerCase())} large/>
        </div>
        <div className="py-2">
          <h1 className="text-3xl">
            Welcome to the <span className='font-extrabold'>{topic} </span> Topic
          </h1>
          {/* <p className="text-sm text-gray-400">{topic}</p> */}
        </div>
      </div>
    </div>

    <div className="mx-auto mt-5 max-w-5xl pb-10">
      <PostBox topic={topic as string} />
      <Feed topic={topic as string} />
    </div>
  </div>

  )
}

export default Topic