import React from "react";
import ItemCard from "../ItemsCard";
import { connect } from "react-redux";
import { ViewerContext } from "../../context/ViewerProvider";

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
