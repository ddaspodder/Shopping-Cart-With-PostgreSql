--rank orders per user by date

SELECT *, RANK() OVER (
        PARTITION BY
            user_id
        ORDER BY created_at DESC
    )
FROM orders;

--Show running total of order amounts per user

SELECT *, SUM(total_amount) OVER (
        PARTITION BY
            user_id
        ORDER BY id
    ) as running_total
FROM orders;