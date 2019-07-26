import React, { Component } from "react";
import Profile from "./Profile";
import ItemGrid from "../../components/ItemsGrid";
import { ALL_USER_ITEMS_QUERY } from "../../apollo/queries";
import FullScreenLoader from "../../components/FullScreenLoader";
import { ViewerContext } from "../../context/ViewerProvider";

import { Query } from "react-apollo";

class ProfileContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
        {({ viewer }) => (
          <Query
            query={ALL_USER_ITEMS_QUERY}
            variables={{ id: this.props.match.params.userid || viewer.id }}
          >
            {({ loading, error, data }) => {
              if (loading) return <FullScreenLoader />;
              if (error) return `Error! ${error.message}`;
              return <Profile user={data.user} />;
            }}
          </Query>
        )}
      </ViewerContext.Consumer>
    );
  }
}

export default ProfileContainer;
