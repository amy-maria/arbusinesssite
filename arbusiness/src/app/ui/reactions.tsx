'use client'
import { useState, useEffect } from 'react';

type ReactionsProps = {
  initialLikes: number;
  initialDislikes: number;
  postId: string;
};

async function updateReaction(postId: string, action: 'like' | 'dislike'): Promise<{ likes: number; dislikes: number }> {
  try {
    const res = await fetch('http://localhost:10031/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation UpdateLikes($input: UpdateLikesInput!) {
            updateLikes(input: $input) {
              likes
              dislikes
            }
          }
        `,
        variables: {
          input: { postId, action },
        },
      }),
    });

    if (!res.ok) throw new Error('Failed to update reaction');

    const data = await res.json();
    return {
      likes: data?.data?.updateLikes?.likes ?? 0,
      dislikes: data?.data?.updateLikes?.dislikes ?? 0,
    };
  } catch (error) {
    console.error('Error updating reaction:', error);
    return { likes: -1, dislikes: -1 };
  }
}

export default function Reactions({ initialLikes, initialDislikes, postId }: ReactionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [message, setMessage] = useState('');

  // Initialize session state
  useEffect(() => {
    const likedPosts = JSON.parse(sessionStorage.getItem('likedPosts') || '[]');
    const dislikedPosts = JSON.parse(sessionStorage.getItem('dislikedPosts') || '[]');

    if (likedPosts.includes(postId)) setLiked(true);
    if (dislikedPosts.includes(postId)) setDisliked(true);
  }, [postId]);

  const handleLike = async () => {
    if (liked) {
      setMessage('You already liked this post!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    const updated = await updateReaction(postId, 'like');
    if (updated.likes !== -1) {
      setLikes(updated.likes);
      setLiked(true);

      const likedPosts = JSON.parse(sessionStorage.getItem('likedPosts') || '[]');
      sessionStorage.setItem('likedPosts', JSON.stringify([...likedPosts, postId]));
    }
  };

  const handleDislike = async () => {
     if (disliked) {
      setMessage('You already disliked this post!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    const updated = await updateReaction(postId, 'dislike');
    if (updated.dislikes !== -1) {
      setDislikes(updated.dislikes);
      setDisliked(true);

      const dislikedPosts = JSON.parse(sessionStorage.getItem('dislikedPosts') || '[]');
      sessionStorage.setItem('dislikedPosts', JSON.stringify([...dislikedPosts, postId]));
    }
  };
  const buttonStyle = (active: boolean) => ({
    cursor: active ? 'not-allowed' : 'pointer',
    opacity: active ? 0.5 : 1,
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    transition: 'opacity 0.2s, background 0.2s',
    background: active ? '#e0e0e0' : '#fff',
   
  });


  return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>

      <button 
      style={buttonStyle(liked)}
      onClick={handleLike} 
      title={ liked ? 'You already liked this post': 'Like this post'}
      > ❤️ <span style={{color: 'black', padding: '5px'}}>{likes}</span>
      </button>

      <button 
      style={buttonStyle(disliked)}
      onClick={handleDislike} 
      title={disliked ? 'You already disliked this post': ''}
      > 👎 <span style={{color: 'black', padding: '5px'}}>{dislikes}</span>
      </button>
    </div>
    {message && (
        <div style= {{ color: 'red', fontSize: '0.9rem'}}>
            {message}
        </div>
    )}
    </div>
  );
}
