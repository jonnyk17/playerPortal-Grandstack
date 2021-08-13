import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectWrapper: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  select: {
    width: "100%",
  },
  formGroup: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
export function SimpleSelect({ name, value, handleChange, list, ...props }) {
  const classes = useStyles();

  return (
    <div className={classes.formGroup}>
      <div className={classes.selectWrapper}>
        <InputLabel>{name}</InputLabel>
        <Select
          className={classes.select}
          value={value}
          onChange={handleChange}
          {...props}
        >
          {list.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
