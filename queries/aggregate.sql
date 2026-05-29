--Sum total amount spent by each user

SELECT u.*, SUM(o.total_amount) as total_amount
FROM users as u
    INNER JOIN orders as o ON u.id = o.user_id
GROUP BY
    u.id;

--Get products that appear in more than 1 cart

SELECT p.*, COUNT(c.id) as cart_count
FROM
    products as p
    INNER JOIN cart_items as ci ON p.id = ci.product_id
    INNER JOIN carts as c ON c.id = ci.cart_id
GROUP BY
    p.id
HAVING
    COUNT(c.id) > 1