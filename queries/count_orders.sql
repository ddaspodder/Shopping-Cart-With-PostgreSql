SELECT u.*, COUNT(o.id)
FROM users as u
    LEFT JOIN orders AS o ON u.id = o.user_id
GROUP BY
    u.id;