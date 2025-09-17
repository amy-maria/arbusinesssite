import { request, gql } from 'graphql-request';
import LikeButton from '../../../ui/like-button';
import DislikeButton from '../../../ui/dislike-button';
import { fromGlobalId } from 'graphql-relay';
import Reactions from 'app/ui/reactions';

const API_URL = 'http://localhost:10031/graphql';

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
    }
  }
`;

// This async component receives the 'params' object from Next.js
export default async function SinglePostPage({ params } : { params: { slug: string } }) {
  

  const { postBy } = await request(API_URL, GET_SINGLE_POST, { slug: params.slug });

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
      {/* user uploaded and hosted video */}
      {postBy.videoUrl && (
    <div style={{ margin: '1rem 0' }}>
    <video width="100%" controls>
      <source src={postBy.videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  {/*YouTube video */}
  {postBy.videoUrl && postBy.videoUrl.includes('youtube') && (
    <iframe
    width="100%"
    height="400"
    src={postBy.videoUrl.replace('watch?v=', 'embed/')}
    title="Post video"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
  )}
  </div>
)}
  
      {/* dangerouslySetInnerHTML is used for rendering raw HTML from the post content */}
      <div dangerouslySetInnerHTML={{ __html: postBy.content }} />
      <Reactions
      initialLikes={postBy.likes ?? 0} 
      initialDislikes={postBy.dislikes ?? 0} 
      postId={dbId} 
      />
 
    </div>
  );
}
