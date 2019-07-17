SELECT tags.name
FROM tags
	INNER JOIN item_tags
	ON item_tags.tags_id = tags.id
WHERE item_id = 3;
