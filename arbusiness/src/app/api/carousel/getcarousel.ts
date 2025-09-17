import { request, gql } from 'graphql-request';

const API_URL = 'http://localhost:10031/graphql';

const GET_CAROUSEL = gql`
  query GetCarouselSlides {
    carouselPosts {
      nodes {
        title
        featuredImage {
          node {
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
  return data.carouselPosts.nodes;
}
