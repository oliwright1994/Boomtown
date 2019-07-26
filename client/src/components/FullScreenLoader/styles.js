const styles = theme => ({
  root: {
    height: "90vh",
    width: "100%",
    background: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  loader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.palette.primary.main
  }
});

export default styles;
