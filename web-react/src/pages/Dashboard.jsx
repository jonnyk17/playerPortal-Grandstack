import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  RecordsChart,
  USER_RECORD_FRAGMENT,
  RECORDS_FRAGMENT,
  Profile,
  PROFILE_FRAGMENT,
  UserEvents,
  USER_EVENTS_FRAGMENT,
} from "../components";
import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";

export const DASHBOARD_QUERY = gql`
  query Dashboard($id: String!, $recordsWhere: RecordWhere) {
    users(where: { id: $id }) {
      ...ProfileFragment
      ...UserEvents
      ...UserRecord
    }

    records(where: $recordsWhere) {
      ...AllUserRecords
    }
  }

  ${PROFILE_FRAGMENT}
  ${USER_EVENTS_FRAGMENT}
  ${USER_RECORD_FRAGMENT}
  ${RECORDS_FRAGMENT}
`;

export function Dashboard() {
  const { user, isLoading } = useAuth0();
  const { data, loading, error, refetch } = useQuery(DASHBOARD_QUERY, {
    variables: { id: user.sub },
    skip: isLoading,
    fetchPolicy: "network-only",
  });
  const theme = useTheme();

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    fixedHeight: {
      height: 500,
    },
    fixedHeightProfile: {
      height: 150,
    },
  }));
  const classes = useStyles(theme);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeightProfile);

  if (loading || isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error</div>;

  const dataUser = data.users[0];

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {/* Profile */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper2}>
            <Profile user={dataUser} />
          </Paper>
        </Grid>
        {/* Records Chart */}
        <Grid item xs={12} md={8} lg={7}>
          <Paper className={fixedHeightPaper}>
            <RecordsChart
              user={dataUser}
              records={data.records}
              onAgeSportFilterChange={(filterType, eventState) => {
                if (filterType !== "") {
                  refetch({
                    recordsWhere: {
                      event: {
                        event: eventState,
                      },
                      user: {
                        [filterType]: dataUser[filterType],
                      },
                    },
                  });
                }
              }}
              onEventFilterChange={(Event, filterType) => {
                if (filterType !== "") {
                  refetch({
                    recordsWhere: {
                      event: {
                        event: Event,
                      },
                      user: {
                        [filterType]: data.users[0][filterType],
                      },
                    },
                  });
                }
              }}
            />
          </Paper>
        </Grid>
        {/* Recent Reviews */}
        <Grid item xs={12} md={8} lg={5}>
          <Paper className={classes.paper}>
            <UserEvents user={dataUser} />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
