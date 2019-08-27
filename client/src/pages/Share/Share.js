import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Grid from "@material-ui/core/Grid";
import ShareItemForm from "../../components/ShareItemForm";
import ShareItemPreview from "../../components/ShareItemPreview";
import PropTypes from "prop-types";

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

Share.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  )
};
