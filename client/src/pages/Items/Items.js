import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ItemGrid from "../../components/ItemsGrid";

const Items = ({ items, classes }) => {
  return (
    <div className={classes.root}>
      <ItemGrid items={items} rowSize={4} />
    </div>
  );
};

export default withStyles(styles)(Items);
