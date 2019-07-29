const styles = theme => ({
  root: {
    position: "sticky",
    height: 50,
    background: theme.palette.primary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    width: "100%"
  },
  logo: {
    height: "300%"
  },
  menuLinks: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  navLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    borderRadius: "50%",
    "&:hover": {
      background: "rgba(0,0,0, .1)"
    }
  },
  shareLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    "&:hover": {
      background: "rgba(0,0,0, .1)"
    }
  },
  shareText: {
    color: "black",
    fontSize: 10,
    display: "flex",
    alignItems: "center",
    fontWeight: 500
  },
  shareIcon: {
    fontSize: 16,
    marginRight: 3
  },
  menu: {
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      background: "rgba(0,0,0, .1)"
    }
  }
});

export default styles;
