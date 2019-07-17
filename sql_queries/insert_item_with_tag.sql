WITH new_item AS (
INSERT into items
  (title, description, imageurl, ownerid)
VALUES
  ('Ball', 'is ball', 'bounce.jpeg', 1)
returning id AS itemid
),
new_tag AS
(
INSERT INTO tags
  (name)
VALUES
  ('Bouncy')
returning id AS tagid
)
INSERT INTO item_tags
  (tags_id, item_id)
VALUES
  ((SELECT tagid
    FROM new_tag), (SELECT itemid
    FROM new_item));
