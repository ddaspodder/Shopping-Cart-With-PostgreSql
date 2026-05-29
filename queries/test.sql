DELETE FROM cart_items
WHERE
    id IN (
        SELECT DISTINCT
            ci.id
        FROM
            carts as c
            INNER JOIN cart_items as ci ON c.id = ci.cart_id
            INNER JOIN products as p ON ci.product_id = p.id
        WHERE
            c.user_id = 7
            AND p.is_active = FALSE
    )

SELECT *
FROM cart_items
WHERE
    id IN (
        SELECT DISTINCT
            ci.id
        FROM
            carts as c
            INNER JOIN cart_items as ci ON c.id = ci.cart_id
            INNER JOIN products as p ON ci.product_id = p.id
        WHERE
            c.user_id = 7
            AND p.is_active = FALSE
    )

SELECT *
FROM products
WHERE
    is_active = TRUE
    AND name ILIKE '%gaming chair%';

SELECT * FROM cart_items;

SELECT * FROM carts;