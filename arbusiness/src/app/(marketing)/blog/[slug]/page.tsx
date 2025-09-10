import { request, gql } from 'graphql-request';
import LikeButton from '../../../ui/like-button';
import DislikeButton from '../../../ui/dislike-button';

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
    }
  }
`;

// This async component receives the 'params' object from Next.js
export default async function SinglePostPage({ params }) {
  const { slug } = params;

  if (!slug) {
    return <div>Post not found.</div>;
  }

  // Fetch the data for the specific post
  const { postBy } = await request(API_URL, GET_SINGLE_POST, { slug });

  if (!postBy) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{postBy.title}</h1>
      <p className="text-gray-500 mb-6">
        By {postBy.author.node.name} on {new Date(postBy.date).toLocaleDateString()}
      </p>
      {/* dangerouslySetInnerHTML is used for rendering raw HTML from the post content */}
      <div dangerouslySetInnerHTML={{ __html: postBy.content }} />
       {/*<LikeButton initialCount={likes} postId={id} />
        <DislikeButton initialCount={dislikes} postId={id} />*/}
    </div>
  );
}
