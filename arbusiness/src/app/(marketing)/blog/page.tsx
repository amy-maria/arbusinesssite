'use client'
import {request, gql} from 'graphql-request';
import Link from 'next/link';
import { useEffect, useState, useMemo} from 'react';
import ReactPaginate from 'react-paginate';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

const GET_POSTS = gql`
  query GetPosts{
    posts {
      edges {
        node {
          id
          title
          slug
          date
          excerpt
        }
      }
    }
  }
`;

export default function BlogPosts() {
  const [allPosts, setAllPosts] = useState([]);//store all posts in state
  const [currentPage, setCurrentPage] = useState(0);
  const POSTS_PER_PAGE = 5;

  // Fetch all posts on mount
  useEffect(() => {
    async function fetchPosts() {
      const { posts } = await request(API_URL, GET_POSTS);
      setAllPosts(posts.edges.map(edge => edge.node)); //map edges to node objects
    }
    fetchPosts();
  }, []);

  // Pagination logic
  const offset = currentPage * POSTS_PER_PAGE;
  const currentPosts = useMemo(() => {
    return allPosts.slice(currentPage * POSTS_PER_PAGE, (currentPage + 1) * POSTS_PER_PAGE); 
  }, [allPosts, currentPage]);
  //updates when currentPage changes
  const pageCount = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0); // optional: scroll to top on page change
  };//updates page state, triggers useMemo

  if (allPosts.length === 0) return <div>Loading posts...</div>;


  
  return (
    
     
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <ul>
        {currentPosts.map((node ) => (
          <li key={node.id}>
             <article className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
           <h2 className="text-2xl font-bold mb-2">
            <Link href={`/blog/${node.slug}`}>
              {node.title}
            </Link>
            </h2>
            <p className="text-sm text-gray-500 mb-4">Published: {new Date(node.date).toLocaleDateString()}</p>
            <p className="line-clamp-3 text-gray-700">
             {node.excerpt.replace(/<[^>]+>/g, "")}
            </p>
            </article>
          </li>
        ))}
      </ul>
       {pageCount > 1 && (
       <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        forcePage={currentPage} //sync ReactPaginate with State
        containerClassName="flex justify-center mt-8 gap-2"
        pageClassName="px-3 py-1 border rounded hover:bg-gray-200"
        activeClassName="bg-blue-600 text-white"
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        disabledClassName="opacity-50 cursor-not-allowed"
      />
       )}
    </div>

  );
}
      

