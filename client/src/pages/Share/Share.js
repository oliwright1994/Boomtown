import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import ShareItemForm from "../../components/ShareItemForm";
import ShareItemPreview from "../../components/ShareItemPreview";

const Share = ({ classes, tags }) => {
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item className={classes.preview}>
          <ShareItemPreview />
        </Grid>
        <Grid item className={classes.inputForm}>
          <ShareItemForm tags={tags} />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Share);
