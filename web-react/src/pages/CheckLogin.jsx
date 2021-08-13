import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

export function CheckLogin() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <p>Loading</p>;

  if (isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: "/profile",
        }}
      />
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }
}
