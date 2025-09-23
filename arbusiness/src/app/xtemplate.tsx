// app/blog/[slug]/template.js

'use client'; // Templates are client components

import { useEffect } from 'react';

export default function PostTemplate({ children }) {
  useEffect(() => {
    console.log('Template re-rendered for new post');
  }, []);

  return (
    <div>
      {/* Any UI that should re-render */}
      {children}
    </div>
  );
}