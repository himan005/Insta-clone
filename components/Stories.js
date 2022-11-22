import React, { useEffect, useState } from 'react';
// import faker from 'faker';
import {faker} from '@faker-js/faker'
import Story from './Story'
import {useSession} from 'next-auth/react';


const Stories = () => {

    const {data:session} = useSession();

    const [suggestions, setSuggestions] = useState([])

    useEffect(() =>{
        const DummyData = [...Array(20)].map((_,i) =>(
            {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                avatar: faker.image.avatar(),
                birthdate: faker.date.birthdate(),
                id:i,
            }
        ))
        console.log(DummyData)
        setSuggestions(DummyData)
    },[])

  return (
    <div className='flex bg-white mt-8 border-gray-200 p-6 space-x-2 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
        {
            session && (
                <Story 
                    ava={session.user.image} 
                    username={session.user.username}
                />
            )
        }
        
        {
            suggestions.map((profile) =>(
                <Story
                    key={profile.id}
                    ava={profile.avatar}
                    username={profile.username}
                 />
            ))
        }
    </div>
  )
}

export default Stories