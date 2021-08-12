import {gql} from "@apollo/client"

export const CONNECT_EVENT = gql`
mutation Mutation(
  $updateUsersWhere: UserWhere
  $updateUsersConnect: UserConnectInput
  $updateUsersCreate: UserRelationInput
) {
  updateUsers(
    where: $updateUsersWhere
    connect: $updateUsersConnect
    create: $updateUsersCreate
  ) {
    users {
      displayName
    }
  }
}
`;