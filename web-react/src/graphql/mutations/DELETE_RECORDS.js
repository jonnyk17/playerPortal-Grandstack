import { gql } from "@apollo/client"

export const DELETE_RECORDS = gql`
mutation Mutation($deleteRecordsWhere: RecordWhere) {
  deleteRecords(where: $deleteRecordsWhere) {
    nodesDeleted
  }
}
`;