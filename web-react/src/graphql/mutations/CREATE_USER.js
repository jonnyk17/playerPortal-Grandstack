import {gql} from "@apollo/client"

export const CREATE_USER = gql`
  mutation Mutation($createUsersInput: [UserCreateInput!]!) {
    createUsers(input: $createUsersInput) {
      users {
        displayName
        userName
        Sport
        Age
        id
        Height
        Weight
      }
    }
  }
`;
