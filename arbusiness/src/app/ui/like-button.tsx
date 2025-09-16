'use client'
 import { useState } from 'react'

 {/* 1. button
      2. handleClick
      3. update like count
      4. integrate w/ individual post 
      5. save count by postID
      6. ? can it update WP ?
      */}
type LikeButtonProps = {
  initialLikes: number
  postId: string // Add postId to the props
}
    

async function incrementLike(postId: string): Promise<number> {
  try {
    const res = await fetch('http://localhost:10031/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, action: 'like' }),
  })
  if (!res.ok) {
    throw new Error('Failed to update likes')
  }

  const data = await res.json()
  const newLikes = data?.data?.updateLikes?.likes 
  console.log('API response:', data)
  return newLikes ?? 0
  } catch (error) {
    console.error('Error incrementing like:', error)
    return -1
  }
}


export default function LikeButton({ initialLikes, postId }: LikeButtonProps) {

  const [likes, setLikes] = useState(initialLikes)
 
  const handleLike = async () => {
    const updateLikes = await incrementLike(postId)
    if (updateLikes !== -1){
      setLikes(updateLikes)
    }
  }
  return (
    <>
      <span> Likes: {likes}
      <button
        onClick={handleLike}>
      ❤️
      </button>
      </span>
    </>
  )
}