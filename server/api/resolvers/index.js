const { ApolloError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const authMutations = require("./auth");
// -------------------------------
const { DateScalar } = require("../custom-types");

module.exports = app => {
  return {
    // Date: DateScalar,

    Query: {
      viewer(root, args, context, info) {
        const user = jwt.decode(context.token, app.get("JWT_SECRET"));
        if (!user) {
          return null;
        } else {
          return user;
        }
      },
      async user(root, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (error) {
          throw new ApolloError(error);
        }
      },
      async items(root, { filter }, { pgResource }, info) {
        try {
          let items = await pgResource.getItems(filter);
          return items;
        } catch (error) {
          throw new ApolloError(error);
        }
      },
      async tags(parent, args, { pgResource }, info) {
        try {
          let tags = await pgResource.getTags();
          return tags;
        } catch (error) {
          throw new ApolloError(error);
        }
      }
    },

    User: {
      async items(parent, args, { pgResource }, info) {
        try {
          let items = await pgResource.getItemsForUser(parent.id);
          return items;
        } catch (error) {
          throw new ApolloError(error);
        }
      },
      async borrowed(parent, args, { pgResource }, info) {
        try {
          let borrowedItems = await pgResource.getBorrowedItemsForUser(
            parent.id
          );
          return borrowedItems;
        } catch (error) {
          throw new ApolloError(error);
        }
      }
    },

    Item: {
      async itemowner(parent, args, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(parent.ownerid);
          return user;
        } catch (error) {
          throw new ApolloError(error);
        }
      },
      async tags(parent, args, { pgResource }, info) {
        try {
          const itemTags = await pgResource.getTagsForItem(parent.id);
          return itemTags;
        } catch (error) {
          throw new ApolloError(error);
        }
      },
      async borrower(parent, args, { pgResource }, info) {
        if (!parent.id) {
          return null;
        }
        try {
          const borrower = await pgResource.getUserById(parent.borrowerid);
          return borrower;
        } catch (error) {
          throw new ApolloError(error);
        }
      }
    },

    Mutation: {
      ...authMutations(app),

      async addItem(parent, { item }, { pgResource, token }, info) {
        const user = await jwt.decode(token, app.get("JWT_SECRET"));
        try {
          const newItem = await pgResource.saveNewItem({
            item: item,
            image: undefined,
            user: user.id
          });
          return newItem;
        } catch (e) {
          return new ApolloError(error);
        }
      }
    }
  };
};
