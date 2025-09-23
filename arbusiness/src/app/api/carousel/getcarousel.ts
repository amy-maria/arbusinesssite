import { request, gql } from 'graphql-request';

const GRAPHQL_ENDPOINT = 'http://localhost:10031/graphql';

export const Get_Carousel_Slides = gql`
  query GetCarouselSlides($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      title
      carouselImages {
        carouselImage1 {
          node {
            sourceUrl
            altText
          }
        }
        carouselImage2 {
          node {
            sourceUrl
            altText
          }
        }
        carouselImage3 {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export async function getCarouselSlides(slug: string) {
 
    const data = await request(GRAPHQL_ENDPOINT, Get_Carousel_Slides, {slug});
    const carouselData = data.page.carouselImages;

    const slides = ['carouselImage1','carouselImage2', 'carouselImage3'].map((key) => carouselData[key]?.node).filter(Boolean) as { sourceUrl: string; altText: string}[];

    return slides;
  }

    