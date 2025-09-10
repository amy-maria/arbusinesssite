'use client'
import { useState } from 'react'
 
export default function DislikeButton({ initialDislikes }: { initialDislikes: number }) {
  const [dislikes, setDislikes] = useState(initialDislikes)
 
  return (
    <>
      <p>Dislikes: {dislikes}</p>
      <button
        onClick={async () => {
          const updatedDislikes = await incrementDislike()
          setDislikes(updatedDislikes)
        }}
      >
      👎
      </button>
      </>
      );
      }