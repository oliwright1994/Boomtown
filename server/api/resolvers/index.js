const { ApolloError } = require("apollo-server-express");
// @TODO: Uncomment these lines later when we add auth
const jwt = require("jsonwebtoken");
const authMutations = require("./auth");
// -------------------------------
const { DateScalar } = require("../custom-types");

module.exports = app => {
  return {
    // Date: DateScalar,

    Query: {
      viewer(root, args, { pgResource, req }, info) {
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */
        console.log(jwt.verify(req.res.cookies));
        return null;
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
      async addItem(parent, { item }, { pgResource }, info) {
        const user = 1;
        try {
          const newItem = await pgResource.saveNewItem({
            item: item,
            image: undefined,
            user: user
          });
          return newItem;
        } catch (e) {
          return new ApolloError(error);
        }
      }
    }
  };
};
