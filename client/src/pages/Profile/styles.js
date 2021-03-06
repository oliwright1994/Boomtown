const styles = theme => ({
  root: {
    width: "100%",
    background: theme.palette.secondary.main,
    padding: "5%",
    minHeight: "100vh"
  },
  profileCard: {
    borderRadius: 2,
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
  },
  itemsTitle: {
    margin: 30,
    marginLeft: 15,
    color: theme.palette.primary.main
  }
});

export default styles;
