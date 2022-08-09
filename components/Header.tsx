import Image from "next/image";
import React from "react";
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
} from '@heroicons/react/outline'
import Link from 'next/link'

function Header() {
  return (
    <div className="max-w-full sticky top-0 z-50 flex min-w-fit items-center bg-black px-1 py-2 border-blue-500">
      <div className="relative h-20 w-20">
        <Image
          objectFit="contain"
          src="https://avatars.githubusercontent.com/u/96020697?v=4"
          layout="fill"
        />
      </div>

      <form className="flex flex-1 mx-3 items-center space-x-4 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Civilised Forum"
        />
        <button type="submit" hidden />
      </form>
      <div className="items-center mx-20 min-w-fit space-x-8 flex text-gray-500">
        <a>
          <VideoCameraIcon className="icon h-6 text-orange-500 hover:text-white transition-all duration-500" />
        </a>
        <a href="https://iiitp-civilised.netlify.app/">
          <ChatIcon className="icon h-6 text-orange-500 hover:text-white transition-all duration-500" />
        </a>
        <PlusIcon className="icon h-6 text-orange-500 hover:text-white transition-all duration-500" />
      </div>
      <div className="mx-5 flex items-center">
        <MenuIcon className="icon" />
      </div>
    </div>
  );
}

export default Header;
