import ItemCard from "../ItemsCard";
import React from "react";
import { Grid, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { ViewerContext } from "../../context/ViewerProvider";

const ItemGrid = ({ items, classes }) => {
  return (
    <div>
      <ViewerContext.Consumer>
        {({ viewer }) => (
          <Grid container justify="center" alignItems="flex-start">
            {items.map(item => (
              <Grid key={item.id} item={true}>
                <ItemCard item={item} viewer={viewer} />
              </Grid>
            ))}
          </Grid>
        )}
      </ViewerContext.Consumer>
    </div>
  );
};

export default withStyles(styles)(ItemGrid);
