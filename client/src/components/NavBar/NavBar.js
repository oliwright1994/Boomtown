import React, { Component } from "react";
import { ReactComponent as Logo } from "../../images/boomtown.svg";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { Menu, AppBar, Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const NavBar = ({ classes }) => {
  return (
    <div className={classes.root}>
      <NavLink className={classes.navLink} to="/items">
        <Logo className={classes.logo} />
      </NavLink>
    </div>
  );
};

export default withStyles(styles)(NavBar);
