import React, { Component } from "react";
import { ReactComponent as Logo } from "../../images/boomtown.svg";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Link, Button, Box, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Mutation } from "react-apollo";
import { LOGOUT_MUTATION } from "../../apollo/queries";
import client from "../../apollo";
import Menu from "../Menu";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const NavBar = ({ classes }) => {
  return (
    <div>
      <Mutation
        mutation={LOGOUT_MUTATION}
        onCompleted={() => client.resetStore()}
      >
        {logout => (
          <Box className={classes.root}>
            <NavLink className={classes.navLink} to="/items">
              <Logo className={classes.logo} />
            </NavLink>
            <Box className={classes.menuLinks}>
              <NavLink className={classes.shareLink} to="/share">
                <Typography
                  component="p"
                  variant="body1"
                  className={classes.shareText}
                >
                  <AddCircleIcon className={classes.shareIcon} /> SHARE
                  SOMETHING
                </Typography>
              </NavLink>
              <Menu className={classes.menu} />
            </Box>
          </Box>
        )}
      </Mutation>
    </div>
  );
};

export default withStyles(styles)(NavBar);
