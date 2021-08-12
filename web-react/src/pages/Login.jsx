import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={"/img/login.svg"} alt={"login"} />
        </div>
      </div>
      <div className="footer">
        {
      !isAuthenticated && (
      <button type="button" className="btn" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    )
    }
      </div>
    </div>
  );
}
