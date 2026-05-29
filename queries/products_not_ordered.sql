SELECT *
FROM products
WHERE
    NOT EXISTS (
        SELECT product_id
        FROM order_items
        WHERE
            product_id = products.id
    );