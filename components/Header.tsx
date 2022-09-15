import Image from "next/image";
import { toast } from 'react-hot-toast';
import React, { Fragment, useState } from "react";
import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
  
} from '@heroicons/react/solid'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
  LoginIcon,
  LogoutIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";
import { GET_POSTS_BY_TITLE_SEARCH } from "../Queries/queries";
import client from "../pages/api/apollo-client";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, PaperProps } from "@mui/material";
import Draggable from "react-draggable";
import User from "./User";


type SearchQuery= {
  postTitle:string
}
function Header() {

  const { data: session } = useSession();

  const [toggleSearch, setToggleSearch]= useState<boolean>(false);
  function PaperComponent(props: PaperProps) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }
  
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SearchQuery>()

  const submitSearchQuery = handleSubmit(async({postTitle})=>{
    try {
      const notification = toast.loading('Searching the post with the title..');
      const { data : { getPostUsingTitleAsAString} } = await client.query({
        query : GET_POSTS_BY_TITLE_SEARCH,
        variables : {
          title:postTitle
        },
      })
      console.log(getPostUsingTitleAsAString);
      
      toast.success(`Here are the results -`, {
          id: notification,
          duration: 4000,
      })

      setTimeout(()=>{

      } , 1500)
  
      
    } catch (error) {
      console.log(error);
       
    }
    
  })
  

  return (
    <div className="max-w-full sticky top-0 z-50 flex min-w-fit items-center bg-black px-1 py-2 border-blue-500">
      <div className="relative h-20 w-20 cursor-pointer">
        <Link href={'/'}>
        <Image
          objectFit="contain"
          src="https://iiitp-civilised.netlify.app/static/media/logo.397abd6247433b189851.png"
          layout="fill"
        />
        </Link>
      </div>

      <form onSubmit={submitSearchQuery} className="flex flex-1 w-1/3 min-w-fit items-center space-x-2 mx-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <input
          {...register('postTitle' , {required:true})}
          className="flex-1 w-6 bg-transparent outline-none"
          type="text"
          placeholder="Searching to be done"
        />
        <button type="submit">
          <SearchIcon className="h-6 w-6 text-gray-400" />
        </button>
      </form>
      <div className="items-center md:inline-flex sm:inline:flex sm:mx-3 space-x-3  sm:space-x-3  md:mx-10 mx-3 min-w-fit lg:space-x-16 flex text-gray-500 lg:inline-flex">
        <a>
          <Link href={'/call'}>
          <VideoCameraIcon className="icon md:h-4 lg:h-6 h-2 text-orange-500 hover:text-white transition-all duration-500" />
          </Link>
        </a>
        <a href="https://iiitp-civilised.netlify.app/">
          <ChatIcon className="icon md:h-4 lg:h-6 h-2 text-orange-500 hover:text-white transition-all duration-500" />
        </a>
        <a href="https://civilised-social-web-app.herokuapp.com/welcome">
          <PlusIcon className="icon md:h-4 lg:h-6  h-2 text-orange-500 hover:text-white transition-all duration-500" />
        </a>
        {session ? (
          <Fragment>
          <div
            className=" hidden md:flex cursor-pointer items-center space-x-2 border border-orange-500 hover:text-white transition-all duration-500 p-2 lg:flex "
          >
            
            <div className="relative h-5 w-5 flex-shrink-0">
              <Image
                objectFit="contain"
                src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/54018/skull-emoji-clipart-md.png"
                layout="fill"
                alt=""
              />
            </div> 

            <div className="flex-1  text-sm sm:flex-1">
              <p className="truncate text-orange-500">{session.user?.name}</p>
              <p className="text-orange-500 ">0 posts</p>
            </div>

            <LogoutIcon onClick={() => signOut()} 
              className="h-5 flex-shrink-0 text-orange-500 hover:text-white transition-all duration-500"
            />
           
          </div>
             <LogoutIcon onClick={() => signOut()} 
              className="icon md:h-4 lg:h-6  h-2 md:hidden flex-shrink-0 text-orange-500 hover:text-white transition-all duration-500"
            />
          
          </Fragment>
      ) : (
        <LoginIcon  onClick={()=>signIn()} className="icon md:h-4 lg:h-6  h-2 text-orange-500 hover:text-white transition-all duration-500" />
      )}

      </div>
      <div className="mx-2 hidden items-center sm:hidden justify-center md:hidden lg:hidden">
        <MenuIcon className="icon h-5 text-orange-500" />
      </div>
      <Dialog 
        open={toggleSearch}
        onClose={()=>setToggleSearch(!toggleSearch)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Voters
        </DialogTitle>
        {/* <DialogContent>
          {
            ?.map((voter)=>(
              <User
                key={voter.username}
                name={voter.username}
              />
            ))
          }
        </DialogContent> */}
        <DialogActions>
          <Button variant='contained' sx={{backgroundColor:'orange' ,"&:hover":{"backgroundColor":"rgb(255, 123, 0)"}}} onClick={()=>setToggleSearch(!toggleSearch)}>
            Close
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}

export default Header;
