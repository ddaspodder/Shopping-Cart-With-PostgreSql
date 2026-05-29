SELECT c.*, SUM(ci.quantity) as total_items
FROM carts as c
    LEFT JOIN cart_items as ci ON c.id = ci.cart_id
GROUP BY
    c.id
HAVING
    SUM(ci.quantity) > 3;

-- unique products
SELECT c.*, COUNT(ci.id) as total_items
FROM carts as c
    LEFT JOIN cart_items as ci ON c.id = ci.cart_id
GROUP BY
    c.id
HAVING
    COUNT(ci.id) > 3;