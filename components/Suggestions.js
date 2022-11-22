import React, { useEffect, useState } from 'react';
import {faker} from '@faker-js/faker';


const Suggestions = () => {

  

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() =>{
    const suggestions = [...Array(5)].map((_, i) =>(
      {
        username: faker.internet.userName(),
        address:faker.address.city(),
       email: faker.internet.email(),
        avatar: faker.image.avatar(),
        birthdate: faker.date.birthdate(),
        id:i,
      }
    ))
    setSuggestions(suggestions)
  }, [])

  return (
    <div className="mt-4 mx-10 mb-6">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions For You</h3>
        <button className="text-gray-600 ">See All</button>
      </div>
      {
         suggestions.map((profile) =>(
          <div className="flex items-center justify-between mt-3" key={profile.id}>
            <img className="w-10 h-10 rounded-full border p-[2px]" src={profile.avatar} alt="" />
            <div className="flex-1 ml-4"> 
              <h2 className="font-semibold text-sm">{profile.username}</h2>
              <h3 className="text-xs text-gray-400">from {profile.address}</h3>
            </div>
            <button className="text-blue-400 text-sm font-bold">Follow</button>
          </div>

         ))
      }
    </div>
  )
}

export default Suggestions