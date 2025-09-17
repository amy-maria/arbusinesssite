import { request, gql } from 'graphql-request';

const API_URL = 'http://localhost:10031/graphql';

const GET_CAROUSEL = gql`
  query GetCarouselSlides {
    pages(where: {id:YOUR_PAGE_ID}) {
      nodes {
        title
        gallery { #ACF custom field
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export async function getCarouselSlides() {
  const data = await request(API_URL, GET_CAROUSEL);
  return data.pages.nodes.map((page: any) => ({
    title: page.title,
    images: page.gallery, 
}));
} 
