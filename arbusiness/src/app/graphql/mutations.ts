import {gql} from '@apollo/client';

export const Update_Likes = gql`
mutation UpdateLikes($input: UpdateLikesInput!) {
  updateLikes(input: $input) {
    likes

  }
}
`;
