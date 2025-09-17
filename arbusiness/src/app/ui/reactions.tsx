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
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null);
  const [message, setMessage] = useState('');

  // Initialize session state
  useEffect(() => {
    const reactions = JSON.parse(sessionStorage.getItem('reactions') || '{}');
    if (reactions[postId]) {
      setReaction(reactions[postId]);
    }
  }, [postId]);

  const handleReaction = async (action: 'like' | 'dislike') => {
    if (reaction) {
      setMessage('You already reacted to this post!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const updated = await updateReaction(postId, action);
    if (updated.likes !== -1 && updated.dislikes !== -1) {
      setLikes(updated.likes);
      setDislikes(updated.dislikes);
      setReaction(action);

      const reactions = JSON.parse(sessionStorage.getItem('reactions') || '{}');
      reactions[postId] = action;
      sessionStorage.setItem('reactions', JSON.stringify(reactions));
    }
  };

  const buttonStyle = (disabled: boolean) => ({
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    transition: 'opacity 0.2s, background 0.2s',
    background: disabled ? '#e0e0e0' : '#fff',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          style={buttonStyle(!!reaction)}
          onClick={() => handleReaction('like')}
          disabled={!!reaction}
          title={reaction ? 'You already reacted to this post' : 'Like this post'}
        >
          ❤️ <span style={{ color: 'black', padding: '5px' }}>{likes}</span>
        </button>

        <button
          style={buttonStyle(!!reaction)}
          onClick={() => handleReaction('dislike')}
          disabled={!!reaction}
          title={reaction ? 'You already reacted to this post' : 'Dislike this post'}
        >
          👎 <span style={{ color: 'black', padding: '5px' }}>{dislikes}</span>
        </button>
      </div>

      {message && (
        <div style={{ color: 'red', fontSize: '0.9rem' }}>
          {message}
        </div>
      )}
    </div>
  );
}
