const styles = theme => ({
  root: {
    borderRadius: 2,
    width: 325,
    margin: 12
  },
  media: {
    height: 175,
    width: "100%"
  },
  profilePicture: {
    borderRadius: "50%",
    transition: "all 0.25s",
    "&:hover": {
      transform: "scale(1.1)"
    },
    boxSizing: "border-box",
    marginRight: 12
  },
  captionStyle: {
    color: theme.palette.typography.secondary,
    fontSize: 11,
    marginBottom: 8
  },
  navLink: {
    color: theme.palette.typography.primary,
    textDecoration: "none"
  },
  cardContent: { height: 200 },
  flexRow: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10
  },
  flexColumn: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "column"
  }
});

export default styles;
