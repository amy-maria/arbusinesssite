import {gql} from '@apollo/client';

export const Get_Post_Likes = gql`
  query GetPostLikes($id: ID!) {
  post(id: $id, idType: DATABASE_ID) {
    likes
    dislikes
  }
}
`
