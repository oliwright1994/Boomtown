import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Gravatar from "react-gravatar";
import { Card, Typography, Grid } from "@material-ui/core";
import ItemGrid from "../../components/ItemsGrid";

const Profile = ({ classes, user }) => {
  return (
    <div>
      <Grid className={classes.root} justify="space-evenly" container xs={12}>
        <Grid item xs={12}>
          <Card className={classes.profileCard}>
            <Gravatar
              className={classes.profilePicture}
              email={`"${user.email}"`}
              size={40}
            />
            <Typography className={classes.name} component="h1">
              {user.fullname}
            </Typography>
            <Typography>{user.items.length} Items shared</Typography>
            <Typography>{user.borrowed.length} Items borrowed</Typography>
            <Typography>{user.bio}</Typography>
          </Card>
        </Grid>
        <Grid item>
          <ItemGrid items={user.items} rowSize={6} />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Profile);
