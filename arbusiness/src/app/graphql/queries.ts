import {gql} from '@apollo/client';

export const Get_Post_Likes = gql`
  query GetPostLikes($id: ID!) {
  post(id: $id, idType: DATABASE_ID) {
    likes
    dislikes
  }
}
  query GetCarouselSlides {
  page(id: "troubleshoot-carousel-9-22-25/", idType: URI) {
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
      ccarouselImage3 {
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
