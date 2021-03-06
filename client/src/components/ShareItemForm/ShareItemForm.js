import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Form, Field, FormSpy } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemText from "@material-ui/core/ListItemText";
import { Redirect } from "react-router";
import {
  updateItem,
  resetItem,
  resetItemImage
} from "../../redux/ShareItemPreview/reducer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { ADD_ITEM_MUTATION, ALL_ITEMS_QUERY } from "../../apollo/queries";
import { ViewerContext } from "../../context/ViewerProvider";

class ShareItemForm extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    };
    this.fileInput = React.createRef();
  }

  validate(values) {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    }
    if (!values.description) {
      errors.description = "Required";
    }
    return errors;
  }

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  dispatchUpdate(values, tags, updateNewItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateNewItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  handleSelectTag(event) {
    this.setState({ selectedTags: event.target.value });
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(", ");
  }

  handleSelectFile(event) {
    this.setState({
      fileSelected: this.fileInput.current.files[0]
    });
  }

  resetFileInput() {
    this.props.resetItemImage();
    this.fileInput.current.value = "";
    this.setState({ fileSelected: false });
  }

  submitItem = async (values, addItem, tags) => {
    if (!this.errors) {
      const item = { ...values, tags: this.applyTags(tags) };
      try {
        await addItem({
          variables: { item: item }
        });

        this.resetFileInput();
        this.setState({ done: true });
      } catch (e) {
        throw new Error(e);
      }
    }
  };

  render() {
    const { tags, updateItem, classes } = this.props;
    return (
      <div>
        {this.state.done === true ? <Redirect to="/profile" /> : null}
        <ViewerContext.Consumer>
          {({ viewer }) => (
            <Mutation
              mutation={ADD_ITEM_MUTATION}
              refetchQueries={() => [
                { query: ALL_ITEMS_QUERY, variables: { id: viewer.id } }
              ]}
            >
              {addItem => (
                <Form
                  onSubmit={values => this.submitItem(values, addItem, tags)}
                  validate={values => this.validate(values)}
                  render={({ handleSubmit, pristine, invalid }) => (
                    <form onSubmit={handleSubmit}>
                      <FormSpy
                        subscription={{ values: true }}
                        component={({ values }) => {
                          if (values) {
                            this.dispatchUpdate(values, tags, updateItem);
                          }
                          return "";
                        }}
                      />
                      <div className={classes.formWrapper}>
                        <div>
                          <Typography className={classes.tagline}>
                            Share. Borrow. <br />
                            Prosper.
                          </Typography>
                        </div>
                        <FormControl fullWidth>
                          <Field name="imageurl">
                            {({ input, meta }) => {
                              return (
                                <React.Fragment>
                                  {!this.state.fileSelected ? (
                                    <Button
                                      size="medium"
                                      color="primary"
                                      variant="contained"
                                      onClick={() => {
                                        this.fileInput.current.click();
                                      }}
                                    >
                                      <Typography
                                        className={classes.uploadButtonText}
                                      >
                                        Select an Image
                                      </Typography>
                                    </Button>
                                  ) : (
                                    <Button
                                      size="medium"
                                      color="primary"
                                      variant="outlined"
                                      onClick={() => {
                                        this.resetFileInput();
                                      }}
                                    >
                                      <Typography>Reset image</Typography>
                                    </Button>
                                  )}
                                  <input
                                    ref={this.fileInput}
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    id="fileInput"
                                    onChange={e => this.handleSelectFile(e)}
                                  />
                                </React.Fragment>
                              );
                            }}
                          </Field>
                        </FormControl>
                        <Field
                          name="title"
                          required={true}
                          render={({ input, meta }) => (
                            <div>
                              <TextField
                                fullWidth={true}
                                label="Name your item."
                                inputProps={{ ...input }}
                              />
                            </div>
                          )}
                        />
                      </div>
                      <div>
                        <Field
                          name="description"
                          required={false}
                          render={({ input, meta }) => (
                            <div>
                              <TextField
                                fullWidth={true}
                                multiline={true}
                                rows={5}
                                label="Describe your item."
                                inputProps={{ ...input }}
                              />
                            </div>
                          )}
                        />
                        <FormControl fullWidth>
                          <InputLabel htmlFor="tags">Add some tags</InputLabel>
                          <Field name="tags">
                            {({ input, meta }) => {
                              return (
                                <Select
                                  fullWidth={true}
                                  multiple
                                  value={this.state.selectedTags}
                                  onChange={e => this.handleSelectTag(e)}
                                  renderValue={selected => {
                                    return this.generateTagsText(
                                      tags,
                                      selected
                                    );
                                  }}
                                >
                                  {tags &&
                                    tags.map(tag => (
                                      <MenuItem key={tag.id} value={tag.id}>
                                        <Checkbox
                                          checked={
                                            this.state.selectedTags.indexOf(
                                              tag.id
                                            ) > -1
                                          }
                                        />
                                        <ListItemText primary={tag.title} />
                                      </MenuItem>
                                    ))}
                                </Select>
                              );
                            }}
                          </Field>
                        </FormControl>
                      </div>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={pristine || invalid}
                        className={classes.shareButton}
                      >
                        SHARE
                      </Button>
                      <Typography className={classes.errorMessage}>
                        {this.state.error}
                      </Typography>
                    </form>
                  )}
                />
              )}
            </Mutation>
          )}
        </ViewerContext.Consumer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },
  resetItem(item) {
    dispatch(resetItem(item));
  },
  resetItemImage(item) {
    dispatch(resetItemImage(item));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm));

ShareItemForm.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  )
};
