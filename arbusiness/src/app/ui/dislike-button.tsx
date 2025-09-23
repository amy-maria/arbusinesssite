'use client'
import { useState, useEffect } from 'react';

type DislikeButtonProps = {
  initialDislikes: number;
  postId: string;
};
const API_URL= process.env.NEXT_PUBLIC_WORDPRESS_API_URL
async function incrementDislike(postId: string): Promise<number> {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation UpdateLikes($input: UpdateLikesInput!) {
            updateLikes(input: $input) {
              dislikes
            }
          }
        `,
        variables: {
          input: {
            postId: postId,
            action: 'dislike',
          },
        },
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to update dislikes');
    }

    const data = await res.json();
    const newDislikes = data?.data?.updateLikes?.dislikes;
    console.log('API response:', data);
    return newDislikes ?? 0;
  } catch (error) {
    console.error('Error incrementing dislike:', error);
    return -1;
  }
}

export default function DislikeButton({ initialDislikes, postId }: DislikeButtonProps) {
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [disliked, setDisliked] = useState(false);

  // Initialize state from sessionStorage
  useEffect(() => {
    const dislikedPosts = JSON.parse(sessionStorage.getItem('dislikedPosts') || '[]');
    if (dislikedPosts.includes(postId)) {
      setDisliked(true);
    }
  }, [postId]);

  const handleDislike = async () => {
    if (disliked) return; // prevent multiple clicks

    const updateDislikes = await incrementDislike(postId);
    if (updateDislikes !== -1) {
      setDislikes(updateDislikes);
      setDisliked(true);

      const dislikedPosts = JSON.parse(sessionStorage.getItem('dislikedPosts') || '[]');
      sessionStorage.setItem('dislikedPosts', JSON.stringify([...dislikedPosts, postId]));
    }
  };

  return (
    <>
      <span> Dislikes: {dislikes}
        <button onClick={handleDislike}>
          👎
        </button>
      </span>
    </>
  );
}
