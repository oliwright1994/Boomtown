const styles = theme => ({
  root: {
    width: "100%",
    background: theme.palette.secondary.main,
    padding: "5%"
  },
  profileCard: {
    borderRadius: 2,
    padding: "5%"
  },
  name: {
    color: theme.palette.typography.secondary
  },
  profilePicture: {
    borderRadius: "50%"
  },
  profileBio: {}
});

export default styles;
