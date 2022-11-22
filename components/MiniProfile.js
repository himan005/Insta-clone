import React from 'react'
import {signIn, signOut, useSession} from 'next-auth/react'

const MiniProfile = () => {

  const {data:session} = useSession();
  console.log(session)

  return (
    <div className="flex items-center justify-between mt-6 mx-10">
        <img className='rounded-full border p-[2px] w-16 h-16' src={session?.user?.image} alt="miniProfile" />
        <div className="flex-1 mx-4">
            <h2 className="font-bold">{session?.user?.username}</h2>
            <h3 className="text-sm text-gray-400">Welcome to Instaclone</h3>
        </div>
        <button onClick={signOut} className="text-blue-400 text-sm font-semibold">Sign Out</button>
    </div>
  )
}

export default MiniProfile