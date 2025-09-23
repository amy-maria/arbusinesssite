import { request, gql } from 'graphql-request';
import { fromGlobalId } from 'graphql-relay';
import Reactions from 'app/ui/reactions';

const API_URL =process.env.NEXT_PUBLIC_WORDPRESS_API_URL

const GET_SINGLE_POST = gql`
  query GetSinglePostBySlug($slug: String!) {
    postBy(slug: $slug) {
      title
      content
      date
      author {
        node {
          name
        }
      }
      id
      likes
      dislikes
      videoUrl
    }
  }
`;
function formatYouTubeUrl(url: string) {
  if (url.includes('youtube.com/watch')) {
    return url.replace('watch?v=', 'embed/').split('&')[0];
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}
// This async component receives the 'params' object from Next.js
export default async function SinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
  
  const { slug } = await params; // ✅ wait for params
  const { postBy } = await request(API_URL, GET_SINGLE_POST, { slug});

  if (!postBy) return <div>Post not found.</div>;

  // Convert global ID to database ID
  const dbId = fromGlobalId(postBy.id).id; 
  //await the params promise//
 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{postBy.title}</h1>
      <p className="text-gray-500 mb-6">
        By {postBy.author.node.name} on {new Date(postBy.date).toLocaleDateString()}
      </p>
   
      {/* dangerouslySetInnerHTML is used for rendering raw HTML from the post content */}
      <div dangerouslySetInnerHTML={{ __html: postBy.content }}/>
  {/*YouTube video , allows embed and click out for video*/}
  {postBy.videoUrl && (
  <div>
    <iframe
      width="100%"
      height="400"
      src={formatYouTubeUrl(postBy.videoUrl)}
      title="Post video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
  
    />
    <p>
      <a href={postBy.videoUrl} target="_blank" rel="noopener noreferrer">
        Open video in YouTube
      </a>
    </p>
  </div>
  )}
      <Reactions
      initialLikes={postBy.likes ?? 0} 
      initialDislikes={postBy.dislikes ?? 0} 
      postId={dbId} 
      />
   </div>
  );
  }
