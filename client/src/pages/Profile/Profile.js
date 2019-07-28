import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Gravatar from "react-gravatar";
import { Card, Typography, Grid, Box } from "@material-ui/core";
import ItemGrid from "../../components/ItemsGrid";

const Profile = ({ classes, user }) => {
  return (
    <div>
      <Grid className={classes.root} justify="space-evenly" container xs={12}>
        <Grid item xs={12}>
          <Card className={classes.profileCard}>
            <Box className={classes.rowFlex}>
              <Gravatar
                className={classes.profilePicture}
                email={`"${user.email}"`}
                size={40}
              />
              <Typography className={classes.name} component="h1">
                {user.fullname}
              </Typography>
            </Box>
            <Box className={classes.rowFlex}>
              <Typography>
                <span className={classes.bold}>{user.items.length} </span>
                Items shared
              </Typography>
              <Typography>
                <span className={classes.bold}>{user.borrowed.length}</span>{" "}
                Items borrowed
              </Typography>
            </Box>
            <Typography>{user.bio}</Typography>
          </Card>
        </Grid>
        <Grid item>
          <ItemGrid items={user.items} />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Profile);
