SELECT *
FROM products
WHERE
    is_active = FALSE
    AND id IN (
        SELECT product_id
        FROM cart_items
    );