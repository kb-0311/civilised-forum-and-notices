import { useMutation, useQuery } from '@apollo/client';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import client from '../pages/api/apollo-client';
import { ADD_POST, ADD_TOPIC } from '../Queries/mutations';
import Avatar from './Avatar';
import {toast} from 'react-hot-toast';
import { GET_ALL_POSTS, GET_ALL_POSTS_IN_A_TOPIC, GET_TOPIC_ON_CREATE_POST } from '../Queries/queries';
import { log } from 'console';

type FormData = {
    postTitle: string
    postBody: string
    postImage: string
    topic: string
}

type Props = {
    GlobalTopic?:string
}

function PostBox({GlobalTopic} :Props) {
  
    const {data :session} =useSession();

    const [ addPost ] =useMutation(ADD_POST);
    const [ addTopic ] = useMutation(ADD_TOPIC );

    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FormData>()
    


    const onSubmit = handleSubmit(async ({postBody ,topic:postTopic ,postImage ,postTitle})=>{

        const image = postImage || ''
        if (postTopic) {
        postTopic = postTopic.trim();
          
        } else {
          console.log(GlobalTopic);
          
        }
        postTitle=postTitle.trim();
        
        console.log(postTopic);
        
        const notification = toast.loading('Creating new post...');

        try {
          //topic query
          
       
          const { data : { getTopicListByString } } = await client.query({
            query : GET_TOPIC_ON_CREATE_POST,
            variables : {
              topic: GlobalTopic?.trim() ||postTopic,
            },
          })
          
          
          const topicExists:Boolean = getTopicListByString.length > 0
          
          if (!topicExists) {
            //create topic 
            let numOfPostsHere:Number =1;
            const { data : {insertTopic :newTopic} } = await addTopic({
              variables : {
                topic: postTopic,
                numOfPosts : numOfPostsHere
              } ,
              refetchQueries: [{query:GET_TOPIC_ON_CREATE_POST , variables : {topic:postTopic} } ,],
              
              awaitRefetchQueries: true,
              
            })

            


            const {
              data: { insertPost: newPost },
            } = await addPost({
              variables: {
                body: postBody,
                media: image,
                topic_id: newTopic.id,
                title: postTitle,
                username: session?.user?.name,
              },
              refetchQueries: [{query:GET_ALL_POSTS}],
              awaitRefetchQueries:true

            })
            console.log(
              newPost
            )


          } else {
            //if topic does not exist

            const {
              data: { insertPost: newPost },
            } = await addPost({
              variables: {
                body: postBody,
                media: image,
                topic_id: getTopicListByString[0].id,
                title: postTitle,
                username: session?.user?.name,
              },
              refetchQueries: [{query:GET_ALL_POSTS} , {query:GET_ALL_POSTS_IN_A_TOPIC ,variables:{topic:postTopic}}],
              awaitRefetchQueries:true
            })
            console.log(newPost);
            
           
            
          }



          setValue('postTitle' ,'');
          toast.success(`New post created inside ${postTopic} topic`, {
            id: notification,
            duration: 4000,
          })


        } catch (error) {
          toast.error(`uh oh ! ${error} `, {
            id: notification,
            duration: 4000,
          })
        }
        
    })

  return (
    <form 
    onSubmit={onSubmit}
        className="sticky top-16 z-10 rounded-3xl border border-slate-900 bg-black p-8"
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
                    ? GlobalTopic
                        ? `Create a post in ${GlobalTopic} topic`
                        : 'Start creating a post by entering a title'
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

          {!GlobalTopic && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px] text-white">topic:</p>
              <input
                {...register("topic" , {required:true , minLength:2})}
                className="m-2 rounded-lg flex-1 bg-white p-2 outline-none"
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

              {errors.topic?.type === "required" && (
                <p>- A topic is required</p>
              )}

              {errors.topic?.type === "minLength" && (
                <p>- Topic should consist of alteast 2 chars</p>
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