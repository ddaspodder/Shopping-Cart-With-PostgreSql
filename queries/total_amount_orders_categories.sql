SELECT
    id,
    total_amount,
    CASE
        WHEN total_amount < 1000 THEN 'small'
        WHEN total_amount < 2000 THEN 'medium'
        ELSE 'large'
    END AS order_size
FROM orders;