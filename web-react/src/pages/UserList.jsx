//SEARCH ATHLETES PAGE
import React from "react";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  TableSortLabel,
  TextField,
} from "@material-ui/core";
import { Title, SimpleSelect } from "../components";
const GET_USERS_AND_EVENTS = gql`
  query usersPaginateQuery(
    $first: Int
    $offset: Int
    $orderBy: [UserSort]
    $displayNameContains: String
    $eventContains: String
  ) {
    users(
      options: { limit: $first, skip: $offset, sort: $orderBy }
      where: {
        displayName_CONTAINS: $displayNameContains
        Event: { event_CONTAINS: $eventContains }
      }
    ) {
      displayName
      Age
      Sport

      Records(where: { event: { event: $eventContains } }) {
        record
      }
      Event {
        event
      }
    }

    events {
      event
    }
  }
`;

const styles = (theme) => ({
  root: {
    maxWidth: 700,
    marginTop: theme.spacing(3),
    overflowX: "auto",
    margin: "auto",
  },
  table: {
    minWidth: 100,
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(1),
    minWidth: 300,
    marginTop: theme.spacing(-7),
  },
});

function _UserList(props) {
  const { classes } = props;
  const [order, setOrder] = React.useState("ASC");
  const [orderBy, setOrderBy] = React.useState("displayName");
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [filterState, setFilterState] = React.useState("");
  const [eventState, setEventState] = React.useState("");

  const { loading, data, error, refetch, networkStatus } = useQuery(
    GET_USERS_AND_EVENTS,
    {
      variables: {
        first: rowsPerPage,
        offset: rowsPerPage * page,
        orderBy: { [orderBy]: order },
        eventContains: "",
        recordsWhere: {},
      },
    }
  );

  const handleSortRequest = (property) => {
    const newOrderBy = property;
    let newOrder = "DESC";

    if (orderBy === property && order === "DESC") {
      newOrder = "ASC";
    }

    setOrder(newOrder);
    setOrderBy(newOrderBy);
  };

  const handleFilterChange = (event) => {
    const val = event.target.value;
    setFilterState(val);
    refetch({
      displayNameContains: val,
    });
  };

  const eventFilter = async (event) => {
    const val = event;
    setEventState(val);
    refetch({
      eventContains: val,
    });
  };

  if (error) return <p>Error</p>;
  if (
    loading &&
    NetworkStatus.refetch !== networkStatus &&
    NetworkStatus.setVariables !== networkStatus
  )
    return <p>Loading</p>;
  return (
    <Paper className={classes.root}>
      <Title>Search Athletes</Title>

      <SimpleSelect
        name="Search Event"
        list={data ? data.events.map(({ event }) => event) : []}
        value={eventState}
        handleChange={(e) => eventFilter(e.target.value)}
      >
        {" "}
      </SimpleSelect>
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      <TextField
        id="search"
        label="Search"
        className={classes.textField}
        value={filterState}
        onChange={handleFilterChange}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: classes.input,
        }}
      />

      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && !loading && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell
                key="name"
                sortDirection={
                  orderBy === "displayName" ? order.toLowerCase() : false
                }
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === "displayName"}
                    direction={order.toLowerCase()}
                    onClick={() => handleSortRequest("displayName")}
                  >
                    Name
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell key="Age">Age</TableCell>
              <TableCell key="Sport">Sport</TableCell>
              <TableCell key="Event">Event</TableCell>
              <TableCell key="Record">Record</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((n) => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.displayName}
                  </TableCell>
                  <TableCell>{n.Age}</TableCell>
                  <TableCell>{n.Sport}</TableCell>
                  <TableCell>
                    {String(eventState) !== "" ? String(eventState) : ""}
                  </TableCell>
                  <TableCell>
                    {n.Records.length !== 0 ? n.Records[0].record : ""}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}

export const UserList = withStyles(styles)(_UserList);
