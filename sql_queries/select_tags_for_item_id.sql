SELECT NAME
FROM tags
WHERE id IN
(
  SELECT tags_id
FROM item_tags
WHERE item_id = 4
);
