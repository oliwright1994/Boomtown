import { Query } from "react-apollo";
import React, { Fragment } from "react";
import { VIEWER_QUERY } from "../apollo/queries";

export const ViewerContext = React.createContext();

export const ViewerProvider = ({ children }) => {
  // return (
  //   <Query query={VIEWER_QUERY}>
  //     {({ data, loading }) => {
  //       const viewer = data && data.viewer ? data.viewer : null;
  const viewer = {
    id: 2,
    email: "thing@m",
    fullname: "jobe",
    bio: "nada"
  };

  const loading = false;

  return (
    <ViewerContext.Provider value={{ viewer, loading }}>
      {children}
    </ViewerContext.Provider>
  );
  //     }}
  //   </Query>
  // );
};
