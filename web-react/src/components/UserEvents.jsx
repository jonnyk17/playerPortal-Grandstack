import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Title } from ".";
import { gql } from "@apollo/client";

export const USER_EVENTS_FRAGMENT = gql`
  fragment UserEvents on User{
    Records {
      record
      event {
        event
      }
    }
  }
`

export function UserEvents({ user: { Records } }) {
  return (
    <>
      <Title>Your Events</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell align="right">Record</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {Records.map((element) => (
              <TableRow key={element.event.event}>
                <TableCell>{element.event.event}</TableCell>
                <TableCell align="right"> {element.record}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
