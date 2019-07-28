const styles = theme => ({
  root: {
    width: "100%",
    background: theme.palette.secondary.main,
    padding: "5%",
    minHeight: "100vh"
  },
  profileCard: {
    borderRadius: 2,
    padding: "5%",
    width: "80vw",
    margin: "auto",
    padding: 48
  },
  name: {
    color: theme.palette.typography.secondary,
    fontSize: 30
  },
  profilePicture: {
    borderRadius: "50%",
    marginRight: 10
  },
  rowFlex: {
    display: "flex",
    alignItems: "center",
    "& p": {
      margin: 5,
      marginLeft: 0
    }
  },
  bold: {
    fontWeight: "bold"
  }
});

export default styles;
