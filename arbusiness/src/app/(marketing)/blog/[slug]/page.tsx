import { request, gql } from 'graphql-request';
import { fromGlobalId } from 'graphql-relay';
import { Metadata } from 'next';
import Reactions from 'app/ui/reactions';
import CommentsSection from './commentsection';

const wpBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL; // Add your WP site URL to .env
const FRONTEND_URL = process.env.NEXT_PUBLIC_WP_SITE_URL;
const API_URL =process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const CLIENT_SITE_URL = process.env.NEXT_PUBLIC_WP_SITE_URL;

const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630; 
const DEFAULT_FALLBACK_IMAGE = `/arbusiness/src/assets/bengal-2476933_1280.jpg`; 

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
      seo {
        canonical
        metaDesc
        title
        opengraphTitle #facebook and linkedin title
        opengraphDescription  #facebook and linkedin description
        opengraphImage {
          uri #or sourceURL 
          
        }
      }
    }
  }
`;

// Re-use your GraphQL request logic to fetch the data
export async function generateMetadata({ params }: {  params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; 
  const { postBy } = await request(API_URL, GET_SINGLE_POST, { slug });

  if (!postBy || !postBy.seo) return {};

  const seo = postBy.seo;
  const ogImage = seo.opengraphImage;
  //const imageUrl = ogImage.uri || 'your_default_image_url';
  // Flag to determine if we should include image metadata
  //DEFINE IMAGE VARIABLES FIRST (MUST BE OUTSIDE ANY NESTED BLOCK)
    const imageUrl = ogImage?.uri || DEFAULT_FALLBACK_IMAGE; 
    // Set 'hasImage' to true if we got a WP image or we are using the fallback image
    const hasImage = !!ogImage?.uri || imageUrl === DEFAULT_FALLBACK_IMAGE;
    // Check if the uri exists and is truthy
    // You can use a more explicit check if you truly want NO image when WP fails:
    // const hasImage = !!ogImage?.uri; 
    
    const imageWidth = OG_IMAGE_WIDTH;
    const imageHeight = OG_IMAGE_HEIGHT;


  return {
    metadataBase: new URL(CLIENT_SITE_URL),
    title: seo.title,
    authors: [{ name: postBy.author.node.name }],
    description: seo.metaDesc,
    openGraph: {
      title: seo.opengraphTitle || seo.title,
      description: seo.opengraphDescription || seo.metaDesc,
      url: `${CLIENT_SITE_URL}/blog/${slug}`, // Canonical URL
      type: 'article',
        ...(hasImage && {
        images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: seo.opengraphTitle,
        },
      ],
    }),
  },
 
    twitter: {
      card: hasImage ? 'summary_large_image' : 'summary',
      title: seo.opengraphTitle || seo.title,
      description: seo.opengraphDescription || seo.metaDesc,
      ...(hasImage && { images: [imageUrl] }), 
      //images: [
        //{
         // url: imageUrl,
         // alt: seo.opengraphTitle || seo.title,
        //},
      //],
    },
  };
}

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
export default async function SinglePostPage({params} : {params: Promise<{ slug: string }> }) {
  
  
  const { slug } = await params; // await for params
  const { postBy } = await request(API_URL, GET_SINGLE_POST, { slug});

  if (!postBy) return <div>Post not found.</div>;

  const postUrl = `${FRONTEND_URL}/blog/${slug}`;
  // Convert global ID to database ID
  const dbId = fromGlobalId(postBy.id).id; 
  //await the params promise//
  const numericPostId = Number(dbId);
 // Determine WordPress post ID
  // If your GraphQL query contains a field like wpId, you can use it. Otherwise, you need to map.
  //const wpPostId = fromGlobalId(postBy.id).id  // fallback to dbId if no WP ID

  
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{postBy.title}</h1>
      <p className="text-gray-500 mb-6">
        By {postBy.author.node.name} on {new Date(postBy.date).toLocaleDateString()}
      </p>
   
      {/* dangerouslySetInnerHTML is used for rendering raw HTML from the post content */}
      <div dangerouslySetInnerHTML={{ __html: postBy.content }}/>
  
  <div className="mt-8 flex gap-4">
  <a 
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="bg-blue-800 text-white px-3 py-1 rounded"
  >
    Share on Facebook
  </a>

  <a 
    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="bg-blue-600 text-white px-3 py-1 rounded"
  >
    Share on LinkedIn
  </a>
</div>
  {/*YouTube video , allows embed and click out for video*/}
  {postBy.videoUrl && (
  <div className="my-6">
     <p>
      <a href={postBy.videoUrl} target="_blank" rel="noopener noreferrer">
        Open video in YouTube
      </a>
    </p>
    <iframe
      width="100%"
      height="400"
      src={formatYouTubeUrl(postBy.videoUrl)}
      title={postBy.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
   
  </div>
  )}
      <Reactions
      initialLikes={postBy.likes ?? 0} 
      initialDislikes={postBy.dislikes ?? 0} 
      postId={numericPostId} 
      />
      <CommentsSection postId={numericPostId} wpBaseUrl={wpBaseUrl!} />
   </div>
  );
  }
