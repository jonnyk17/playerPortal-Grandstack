import React from "react";
import { Grid } from "@material-ui/core";
import { useState } from "react";

export function RecordPane({ record, setRecord, type, ...props }) {
  const [minState, setMinState] = useState("");
  const [secState, setSecState] = useState("");
  const [hourState, setHourState] = useState("");

  const handleChange = (e) => {
    setSecState(e.target.value);
    setRecord(minState + ":" + e.target.value)
  };
  const handleHourChange = (e) => {
    setSecState(e.target.value);
    setRecord(hourState + ":" + minState + ":" + e.target.value)
  };
  if(type)
    type=type.type
  console.log(type)
  if (type === "solid") {
    return (
      <div className="form-group">
        <label htmlFor="record">Record</label>
        <input
          type="text"
          name="record"
          placeholder="record"
          value={record}
          onChange={(e) => setRecord(e.target.value)}
        />
      </div>
    );
  } else if (type === "sec" || type === "min" || type === "hour") {
    return (
    <div className="form-group">
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="space-between"
      >
        {type === "hour" && (
          <Grid item xs>
            <input
              style={{ width: "100%" }}
              type="text"
              name="hour"
              placeholder="Hours"
              value={hourState}
              onChange={(e) => setHourState(e.target.value)}
            />
          </Grid>
        )}
        {(type === "min" || type === "hour") && (
          <Grid item xs>
            <input
              style={{ width: "100%" }}
              type="text"
              name="min"
              placeholder="Minutes"
              value={minState}
              onChange={(e) => setMinState(e.target.value)}
            />
          </Grid>
        )}
        <Grid item xs>
          <input
            style={{ width: "100%" }}
            type="text"
            name="sec"
            placeholder="Seconds"
            value={type === "sec" ? record : secState}
            onChange={(e) => {
              if (type === "sec") {
                setRecord(e.target.value)
              } else if (type === "min") {
                handleChange(e);
              } else if (type === "hour") {
                handleHourChange(e);
              }
            }}
          />
        </Grid>
      </Grid>
    </div>
     ) }
  return <div>No event selected</div>;
}
