const styles = theme => ({
  root: {
    position: "sticky",
    height: 50,
    background: theme.palette.primary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10
  },
  logo: {
    height: "300%"
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
  }
});

export default styles;
