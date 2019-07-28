import React from "react";
import Gravatar from "react-gravatar";
import BorrowButton from "../../components/BorrowButton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button, Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";

var moment = require("moment");

const ItemCard = ({ item, classes, viewer }) => {
  const { title, description, imageurl, tags, created, itemowner } = item;
  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
        width="140"
        className={classes.media}
        image={
          imageurl !== null
            ? imageurl
            : "http://via.placeholder.com/350x250?text=No image for this item yet"
        }
      />
      <Box className={classes.flexColumn}>
        <CardContent className={classes.cardContent}>
          <Box className={classes.flexRow}>
            <NavLink
              to={`/profile/${!itemowner ? viewer.id : itemowner.id}`}
              className={classes.navLink}
            >
              <Gravatar
                className={classes.profilePicture}
                size={40}
                email={!itemowner ? viewer.email : itemowner.email}
              />
            </NavLink>
            <div>
              <Typography component="p">
                {!itemowner ? viewer.fullname : itemowner.fullname}
              </Typography>
              <Typography className={classes.captionStyle} variant="caption">
                {created ? moment(created).fromNow() : null}
              </Typography>
            </div>
          </Box>
          <Box>
            <Typography component="h1" gutterBottom>
              {title}
            </Typography>
            <Typography
              className={classes.captionStyle}
              component="p"
              gutterBottom={true}
            >
              {tags.map(tag => tag.title).join(", ")}
            </Typography>
            <Typography component="p">{description}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          {itemowner && viewer.id !== itemowner.id ? (
            <Button variant="outlined" className={classes.borrowButton}>
              BORROW
            </Button>
          ) : null}
        </CardActions>
      </Box>
    </Card>
  );
};

export default withStyles(styles)(ItemCard);
