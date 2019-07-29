const styles = theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      background: "rgba(0,0,0, .1)"
    },
    padding: 0
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    fontSize: 14
  },
  linkIcon: {
    fontSize: 18,
    marginRight: 8
  },
  dropdownMenu: {
    padding: 0
  }
});

export default styles;
