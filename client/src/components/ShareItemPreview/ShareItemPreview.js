import React from "react";
import ItemCard from "../ItemsCard";
import { connect } from "react-redux";
import { ViewerContext } from "../../context/ViewerProvider";
import PropTypes from "prop-types";

const ShareItemPreview = ({ shareItemPreview }) => {
  return (
    <ViewerContext.Consumer>
      {({ viewer }) => <ItemCard item={shareItemPreview} viewer={viewer} />}
    </ViewerContext.Consumer>
  );
};

const mapStateToProps = ({ shareItemPreview }) => {
  return { shareItemPreview };
};
export default connect(mapStateToProps)(ShareItemPreview);

ShareItemPreview.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageurl: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  created: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
