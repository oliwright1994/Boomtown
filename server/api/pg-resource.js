function tagsQueryString(tags, itemid, result) {
  for (i = tags.length; i > 0; i--) {
    result += `($${i}, ${itemid}),`;
  }
  return result.slice(0, -1) + ";";
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *",
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw "An account with this username already exists.";
          case /users_email_key/.test(e.message):
            throw "An account with this email already exists.";
          default:
            throw e;
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: "SELECT * FROM users WHERE email = $1 LIMIT 1",
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "User was not found.";
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text:
          "SELECT id, email, fullname, bio FROM users WHERE id = $1 LIMIT 1;",
        values: [id]
      };
      try {
        const user = await postgres.query(findUserQuery);
        return user.rows[0];
      } catch (e) {
        throw "User cant be found";
      }
    },
    async getItems(idToOmit) {
      try {
        const items = await postgres.query({
          text:
            "SELECT * FROM items WHERE id NOT IN (SELECT id FROM items WHERE ownerid = $1)",
          values: [idToOmit]
        });
        return items.rows;
      } catch (e) {
        throw "Could not find items";
      }
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE ownerid = $1;`,
          values: [id]
        });
        return items.rows;
      } catch (error) {
        throw "Could not find items for user";
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE borrowerid = $1;`,
          values: [id]
        });
        return items.rows;
      } catch (error) {
        throw "Could not find any items this user has borrowed.";
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query({ text: `SELECT * FROM tags` });
        return tags.rows;
      } catch (error) {
        throw "Could not find any tags.";
      }
    },
    async getTagsForItem(id) {
      try {
        const tagsQuery = {
          text: `SELECT tags.title, tags.id FROM tags INNER JOIN item_tags ON item_tags.tags_id = tags.id WHERE item_id = $1;`,
          values: [id]
        };
        const tags = await postgres.query(tagsQuery);
        return tags.rows;
      } catch (error) {
        throw "Could not find any tags for this item";
      }
    },
    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query("BEGIN", async err => {
              const { title, description, tags } = item;

              const tagsid = tags.map(tag => tag.id);

              const newItem = await postgres.query({
                text: `INSERT INTO items (title, description, ownerid ) VALUES ($1, $2, $3) RETURNING *`,
                values: [title, description, user]
              });
              const newItemTags = await postgres.query({
                text: `${tagsQueryString(
                  tags,
                  newItem.rows[0].id,
                  "INSERT INTO item_tags (tags_id, item_id) VALUES "
                )}`,
                values: tagsid
              });

              client.query("COMMIT", err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                resolve(newItem.rows[0]);
                done();
              });
            });
          } catch (e) {
            // Something went wrong
            client.query("ROLLBACK", err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
              return;
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
