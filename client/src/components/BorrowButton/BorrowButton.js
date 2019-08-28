import React from "react";
import Button from "@material-ui/core/Button";
import { Mutation } from "react-apollo";
import {
  BORROW_ITEM_MUTATION,
  RETURN_ITEM_MUTATION
} from "../../apollo/queries";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Box, Typography } from "@material-ui/core";

class BorrowButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borrowed: this.props.borrowed,
      errors: undefined
    };
  }

  borrowItemFunction = async (itemId, viewer, borrowItem) => {
    try {
      await borrowItem({
        variables: { itemId: itemId, borrowerId: viewer.id }
      });
      this.setState({ borrowed: !this.state.borrowed });
    } catch (error) {
      throw error;
    }
  };
  returnItemFunction = async (itemId, viewer, returnItem) => {
    try {
      await returnItem({
        variables: { itemId: itemId, borrowerId: viewer.id }
      });
      this.setState({ borrowed: !this.state.borrowed });
    } catch (error) {
      throw error;
    }
  };
  render() {
    const { viewer, itemId, classes } = this.props;
    if (this.state.borrowed === true) {
      return (
        <Mutation mutation={RETURN_ITEM_MUTATION}>
          {returnItem => (
            <Box>
              {this.state.errors ? (
                <Typography className={classes.error}>
                  {this.state.errors}
                </Typography>
              ) : null}
              <Button
                onClick={() =>
                  this.returnItemFunction(itemId, viewer, returnItem)
                }
                variant="outlined"
                className={this.props.classes.return}
              >
                RETURN
              </Button>
            </Box>
          )}
        </Mutation>
      );
    } else {
      return (
        <Mutation mutation={BORROW_ITEM_MUTATION}>
          {borrowItem => (
            <Box>
              {this.state.errors ? (
                <Typography className={classes.error}>
                  {this.state.errors}
                </Typography>
              ) : null}
              <Button
                onClick={() =>
                  this.borrowItemFunction(itemId, viewer, borrowItem)
                }
                variant="outlined"
                className={this.props.classes.borrow}
              >
                BORROW
              </Button>
            </Box>
          )}
        </Mutation>
      );
    }
  }
}

export default withStyles(styles)(BorrowButton);
