import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Redirect } from 'react-router-dom'
import { gql, useQuery} from "@apollo/client";


export const GET_USERS = gql`
query Query($usersWhere: UserWhere) {

users(where: $usersWhere) {
  displayName
  Sport
  Age
  Height
  Weight
}
}
`
export function Callback() {
    const { user, isLoading } = useAuth0();
    const { loading, data, error } = useQuery(GET_USERS, {
        variables: {
            "usersWhere": {
                "id": user.sub
            }
        }, skip: isLoading
    })

    if (error) return <p>Error</p>
    if (loading) return <p>Loading</p>

    if (data.users.length > 0) {
        return (
            <Redirect
                to={{
                    pathname: "/",

                }}
            />
        )
    }
    else {
        return (
            <Redirect
                to={{
                    pathname: "/register",
                }}
            />

        )
    }


}