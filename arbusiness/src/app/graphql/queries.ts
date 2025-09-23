import {gql} from '@apollo/client';

export const Get_Post_Likes = gql`
  query GetPostLikes($id: ID!) {
  post(id: $id, idType: DATABASE_ID) {
    likes
    dislikes
  }
}
  query GetCarouselSlides ($slug: ID!){
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
      carouselImage4 {
        node {
        sourceUrl
        altText
      }
    }
      carouselImage5 {
        node {
        sourceUrl
        altText
      }
    }
    }
  }
}
  {
  __type(name: "Page") {
    fields {
      name
    }
  }
}

`
