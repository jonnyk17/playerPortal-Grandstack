import { useMutation } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { USER_EXISTS} from "../components/PrivateRoute"
import { GET_USERS } from "./Callback";
import { CREATE_USER } from "../graphql/mutations";


export function Register() {
  const history = useHistory();
  const [formState, setFormState] = useState({
    displayName: "",
    sport: "",
    age: "",
    height: "",
    weight: "",
  });

  const [newUser] = useMutation(CREATE_USER);

  const { user, isLoading } = useAuth0();
  const checkForm = () => {
    if (
      formState.displayName !== "" &&
      formState.age !== "" &&
      formState.sport !== "" &&
      formState.height !== "" &&
      formState.weight !== ""
    )
      newUser({
        refetchQueries: [
          { query: USER_EXISTS },
          {
            query: GET_USERS,
            variables: {
              usersWhere: {
                id: user.sub,
              },
            },
          },
        ],
        awaitRefetchQueries: true,

        variables: {
          createUsersInput: [
            {
              displayName: formState.displayName,
              userName: user.email,
              Weight: formState.weight,
              Height: formState.height,
              id: user.sub,
              Age: formState.age,
              Sport: formState.sport,
            },
          ],
        },
      }).then(() => history.push("/profile"));
  };
  if (isLoading) return <p>Loading</p>;
  return (
    <div className="base-container">
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={"/img/login.svg"} alt={"login"} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="diaplayname">Display Name</label>
            <input
              type="text"
              name="displayname"
              placeholder="displayname"
              value={formState.displayName}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  displayName: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="sport">Sport</label>
            <input
              type="text"
              name="sport"
              placeholder="sport"
              value={formState.sport}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  sport: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              name="age"
              placeholder="age"
              value={formState.age}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  age: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height</label>
            <input
              type="text"
              name="height"
              placeholder="height"
              value={formState.height}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  height: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input
              type="text"
              name="weight"
              placeholder="weight"
              value={formState.weight}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  weight: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="btn" onClick={checkForm}>
          Register
        </button>
      </div>
    </div>
  );
}
