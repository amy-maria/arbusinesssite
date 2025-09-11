'use client'
import { useState } from 'react'
 
export default function DislikeButton({ initialDislikes }: { initialDislikes: number }) {
  const [dislikes, setDislikes] = useState(initialDislikes)
 
  return (
    <>
      <p>Dislikes: {dislikes}
      <button
        onClick={async () => {
          const updatedDislikes = await incrementDislike()
          setDislikes(updatedDislikes +1)
        }}
      >
      👎
      </button>
      </p>
      </>
      );
      }