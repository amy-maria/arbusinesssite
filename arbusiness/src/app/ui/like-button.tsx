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
      body: JSON.stringify({ 
        query: `
        mutation UpdateLikes($input: UpdateLikesInput!) {
        updateLikes(input: $input) {
          likes
        }
      }
        `,
        variables: {
          input: {
            postId: postId, 
            action: 'like' ,
          },
        },
      }),
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
  const [liked, setLiked]= useState(false)
 
  const handleLike = async () => {
    if (liked) return; //prevent multiple clicks
    const updateLikes = await incrementLike(postId)
    if (updateLikes !== -1){
      setLikes(updateLikes);
      setLiked(true); //mark as clicked
      const likedPosts = JSON.parse(sessionStorage.getItem('likedPosts') || '[]');
      sessionStorage.setItem('likedPosts', JSON.stringify([...likedPosts, postId]));
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