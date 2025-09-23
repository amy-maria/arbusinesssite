import {request, gql} from 'graphql-request';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

const GET_POSTS = gql`
  query GetPosts {
    posts {
      edges {
        node {
          id
          title
          slug
          date
        }
      }
    }
  }
`;

export default async function BlogPosts() {
  const { posts } = await request(API_URL, GET_POSTS);

  if (!posts || posts.edges.length ===0) {
    return <div>No posts found.</div>;
    }

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.edges.map(({ node }) => (
          <li key={node.id}>
            <Link href={`/blog/${node.slug}`}>
              {node.title}
            </Link>
            <p>Published: {new Date(node.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

