DELETE FROM cart_items
WHERE
    cart_id = (
        SELECT DISTINCT
            id
        FROM cartS
        WHERE
            user_id = 9
    )