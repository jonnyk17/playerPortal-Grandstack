import {gql} from "@apollo/client"

export const CREATE_EVENT = gql`
mutation Mutation($createEventsInput: [EventsCreateInput!]!) {
  createEvents(input: $createEventsInput) {
    events {
      event
    }
  }
}
`;