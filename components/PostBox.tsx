import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Avatar from './Avatar';

type FormData = {
    postTitle: string
    postBody: string
    postImage: string
    topic: string
}

type Props = {
    subreddit?:string
}

function PostBox({subreddit} :Props) {

    const {data :session} =useSession();

    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FormData>()

  return (
    <form 
        className="sticky top-16  rounded-3xl border border-slate-900 bg-black p-8"
        >
        <div className="flex items-center space-x-3 mx-5">
            <Avatar/>
            <input
                {...register('postTitle' , {required:true})}
                disabled={!session} 
                type="text" 
                className='flex-1 rounded-lg w-1/3 min-w-fit bg-white p-2 pl-5 outline-none"'
                placeholder={
                    session
                    ? subreddit
                        ? `Create a post in r/${subreddit}`
                        : 'Create a post by entering a title'
                    : 'Sign in to post'
                } />
            <PhotographIcon
                onClick={() => setImageBoxOpen(!imageBoxOpen)}
                className={`h-6 cursor-pointer text-white ${
                    imageBoxOpen && 'text-blue-300'
                }`}
            />

            <LinkIcon
                 className="h-6 text-white"
             />
        </div>

        {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          <div className="flex  items-center px-2">
            <p className="min-w-[90px] text-white">Body:</p>
            <textarea
              {...register('postBody')}
              className="m-2 rounded-lg flex-1 h-32 bg-white p-0 outline-none"
              placeholder="Text (Optional)"
              maxLength={500}
            />
          </div>

          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px] text-white">Subreddit:</p>
              <input
                {...register('topic', { required: true })}
                className="m-2 w-1/3 min-w-fit rounded-lg flex-1 bg-white p-2 outline-none"
                type="text"
                placeholder="i.e. reactjs"
              />
            </div>
          )}

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px] text-white">Image URL:</p>
              <input
                {...register('postImage')}
                className="m-2  w-1/3 min-w-fitrounded-lg  flex-1 bg-white p-2 outline-none"
                type="text"
                placeholder="Optional..."
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>- A Post Title is required</p>
              )}

              {errors.topic?.type === 'required' && (
                <p>- A Topic is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-orange-600 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}


    </form>
  )
}

export default PostBox