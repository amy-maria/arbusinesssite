'use client'
 import { useState } from 'react'

 {/* 1. button
      2. handleClick
      3. update like count
      4. integrate w/ individual post 
      5. save count by postID
      6. ? can it update WP ?
      */}

async function incrementLike() {
  const res = await fetch('/api/likes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ postId: $postId, action: 'like' }),
  })

  const data = await res.json()
  return data?.data?.updateLikes?.likes ?? likes
}
export default function LikeButton({ initialLikes }: { initialLikes: number }) {


  const [likes, setLikes] = useState(initialLikes)
 
  return (
    <>
      <p> Likes: {likes}
      <button
        onClick={async () => {
          const updatedLikes = await incrementLike()
          setLikes(updatedLikes +1)
        }}
      >
      ❤️
      </button>
      </p>
    </>
  )
}