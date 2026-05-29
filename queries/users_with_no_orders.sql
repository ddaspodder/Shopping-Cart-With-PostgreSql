SELECT *
from users as u
WHERE
    NOT EXISTS (
        SELECT id
        FROM orders as o
        WHERE
            o.user_id = u.id
    );