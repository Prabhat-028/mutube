import React from 'react'
import Button from './Button'

const ButtonList = () => {
    const list=["All","Podcasts","Mixes","Songs","Live","Cricket","Gaming","News","Cooking","Watched","New to you","History"]
  return (
    <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {list.map((item) => (
        <Button key={item} name={item} />
      ))}
    </div>
  );
}

export default ButtonList;