import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { gql, useQuery } from "@apollo/client";

export const USER_EXISTS = gql`
  query {
    users {
      id
    }
  }
`;

export function PrivateRoute(props) {
  const { user, isAuthenticated } = useAuth0();
  const { pathname } = useLocation();
  var registered = false;
  const { loading, error, data } = useQuery(USER_EXISTS);
  if (error) return <p>Error</p>;
  if (loading) return <p>Loading</p>;
  if (data.users.find((e) => e.id === user.sub)) {
    registered = true;
  }
  if (!isAuthenticated) return <Redirect to={"/"} />;
  else if (isAuthenticated && !registered && pathname !== "/register")
    return <Redirect to={"/register"} />;

  return <Route {...props} />;
}
