import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ItemGrid from "../../components/ItemsGrid";
import PropTypes from "prop-types";

const Items = ({ items, classes }) => {
  return (
    <div className={classes.root}>
      <ItemGrid items={items} rowSize={4} />
    </div>
  );
};

export default withStyles(styles)(Items);

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageurl: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })
      ),
      created: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        .isRequired
    }).isRequired
  )
};
