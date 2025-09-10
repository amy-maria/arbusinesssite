import Posts from '../../ui/posts.tsx'
import { Suspense } from 'react'
import styles from './blog.module.css'
 
export default function Page() {
  // Don't await the data fetching function
  const posts = getPosts()
 
  return (
    <main className={styles.blog}>
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
   </main>
  )
}