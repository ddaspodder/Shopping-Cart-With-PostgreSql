-- Find products that have never been ordered
-- Find users who have never placed an order
-- Find carts containing inactive products
-- Find the most expensive product ever ordered

-- Find products that have never been ordered
SELECT *
FROM products
WHERE
    NOT EXISTS (
        SELECT product_id
        from order_items
        WHERE
            product_id = products.id
    )

-- Find users who have never placed an order

SELECT *
FROM users
WHERE
    id NOT IN (
        SELECT user_id
        FROM orders
    )

-- Find carts containing inactive products

SELECT *
FROM carts
WHERE
    id IN (
        SELECT cart_id
        from cart_items
        WHERE
            product_id IN (
                SELECT id
                FROM products
                WHERE
                    is_active = FALSE
            )
    )

-- Find the most expensive product ever ordered

SELECT *
FROM products
WHERE
    price = (
        SELECT MAX(p.price)
        FROM products AS p
            INNER JOIN order_items AS oi ON p.id = oi.product_id
    )
LIMIT 1;