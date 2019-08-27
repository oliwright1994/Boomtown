import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import ProfileContainer from "../pages/Profile";
import ItemsContainer from "../pages/Items";
import HomeContainer from "../pages/Home";
import ShareContainer from "../pages/Share";
import NavBar from "../components/NavBar";
import { ViewerContext } from "../context/ViewerProvider";
import FullScreenLoader from "../components/FullScreenLoader";
import PRoute from "../components/PrivateRoutes";

export default () => (
  <Fragment>
    <ViewerContext.Consumer>
      {({ viewer, loading }) => {
        if (loading) return <FullScreenLoader />;
        if (!viewer) {
          return (
            <Switch>
              <Route exact path="/welcome" component={HomeContainer} />
              <Redirect from="*" to="/welcome" />
            </Switch>
          );
        }
        return (
          <Fragment>
            <NavBar />
            <Switch>
              <PRoute exact path="/items" component={ItemsContainer} />
              <PRoute exact path="/profile" component={ProfileContainer} />
              <PRoute
                exact
                path="/profile/:userid"
                component={ProfileContainer}
              />
              <PRoute path="/share" component={ShareContainer} />
              <Redirect from="*" to="/items" />
            </Switch>
          </Fragment>
        );
      }}
    </ViewerContext.Consumer>
  </Fragment>
);
