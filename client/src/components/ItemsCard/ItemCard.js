import React from "react";
import Gravatar from "react-gravatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import BorrowButton from "../BorrowButton";

const ItemCard = ({ item, classes, viewer }) => {
  const {
    title,
    description,
    imageurl,
    tags,
    created,
    itemowner,
    borrower
  } = item;
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
          {(itemowner && viewer.id !== itemowner.id && !borrower) ||
          (borrower && borrower.id === viewer.id) ? (
            <BorrowButton
              borrowed={borrower && borrower.id === viewer.id}
              viewer={viewer}
              itemId={item.id}
            />
          ) : null}
        </CardActions>
      </Box>
    </Card>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageurl: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ),
    created: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      .isRequired
  }).isRequired,
  viewer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired
  }).isRequired,
  classes: PropTypes.object
};
export default withStyles(styles)(ItemCard);
