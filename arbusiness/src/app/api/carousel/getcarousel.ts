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
  try {
    const variables = { slug };
    const data = await request(GRAPHQL_ENDPOINT, Get_Carousel_Slides, variables);

    if (!data?.page?.carouselImages) return [];

    const { carouselImages } = data.page;

    // Collect images into an array
    const images = [
      carouselImages.carouselImage1,
      carouselImages.carouselImage2,
      carouselImages.carouselImage3,
    ].filter(Boolean); // remove any nulls

    return images;
  } catch (error) {
    console.error("Error fetching carousel slides:", error);
    return [];
  }
}