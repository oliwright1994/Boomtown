import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";
import { Mutation } from "react-apollo";
import { LOGOUT_MUTATION } from "../../apollo/queries";
import client from "../../apollo";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";

function SimpleMenu({ classes }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.menuButton}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <NavLink to="/profile">Your Profile</NavLink>
        </MenuItem>
        <Mutation
          mutation={LOGOUT_MUTATION}
          onCompleted={() => client.resetStore()}
        >
          {logout => (
            <MenuItem onClick={logout}>
              <PowerIcon />
              Sign Out
            </MenuItem>
          )}
        </Mutation>
      </Menu>
    </div>
  );
}
export default withStyles(styles)(SimpleMenu);
