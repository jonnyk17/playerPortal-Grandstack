//PROFILE PAGE
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Title } from ".";
import { Grid } from "@material-ui/core";
import { gql } from "@apollo/client";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  navLink: {
    textDecoration: "none",
  },
});


export const PROFILE_FRAGMENT = gql`
  fragment ProfileFragment on User{
    displayName
    Age
    Height
    Weight
    Sport
  }
`

export function Profile({ user: { displayName, Age, Height, Weight, Sport } }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>{displayName}</Title>
      <Grid container justifyContent="flex-start" spacing={4}>
        <Grid item>
          <Typography component="p" variant="h6">
            Age: {Age}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="p" variant="h6">
            Height: {Height}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" spacing={4}>
        <Grid item>
          <Typography component="p" variant="h6">
            Sport: {Sport}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="p" variant="h6">
            Weight: {Weight}
          </Typography>
        </Grid>
      </Grid>
      <div>
        <Link to="/users" className={classes.navLink}>
          View users
        </Link>
      </div>
    </React.Fragment>
  );
}
