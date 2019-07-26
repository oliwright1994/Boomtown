import React, { Component } from "react";
import { Query } from "react-apollo";
import Items from "./Items";
import FullScreenLoader from "../../components/FullScreenLoader";
import { ALL_ITEMS_QUERY } from "../../apollo/queries";
import { ViewerContext } from "../../context/ViewerProvider";

class ItemsContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
        {({ viewer }) => (
          <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
            {({ loading, error, data }) => {
              if (loading) return <FullScreenLoader />;
              if (error) return `Error! ${error.message}`;
              return <Items items={data.items} />;
            }}
          </Query>
        )}
      </ViewerContext.Consumer>
    );
  }
}

export default ItemsContainer;
