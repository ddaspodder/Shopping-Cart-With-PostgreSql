-- Compute total order value per order
-- Then filter orders above a threshold
-- Build a report of user order totals

WITH
    order_total as (
        SELECT id, total_amount
        FROM orders
    )
SELECT *
FROM order_total
WHERE
    total_amount > 1000;