import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

const FullScreenLoader = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.loader}>
        <CircularProgress variant="indeterminate" />
        <p>"For it is in giving, that we recieve"</p>
      </div>
    </div>
  );
};

export default withStyles(styles)(FullScreenLoader);
