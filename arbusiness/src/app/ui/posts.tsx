
import Link from 'next/link';
import React from 'react';
import { request, gql } from "graphql-request";

const query = gql`
{
  posts(first: 10) {
    edges {
      node {
        id
        title
        excerpt
        content
        date
        author {
          node {
            id
            name            
          }
        }
        date
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
}
`

export async function getStaticProps() {
  try {
    const data = await request('http://localhost:10031/graphql', query);

    return {
      props: { 
        posts: data.posts.edges,
       },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: []
      },
    };
  }
}

const Index = ({ posts }) => {

  return (
    <div className="relative pb-10 pt-10 lg:pt-0 lg:mt-[-3%]">
      {posts && posts.length > 0 ? (
        posts.map(({ node: post }) => (
          <div key={post.id} className="mb-8 p-4 border rounded-md">
            <Link href={`/blog/${post.slug}`}>
              <h2>{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-500">
              Published on {new Date(post.date).toLocaleDateString()} by {post.author.node.name}
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Index;
