SELECT u.*, COALESCE(SUM(o.total_amount), 0) as total_revenue
FROM users as u
    LEFT JOIN orders AS o ON u.id = o.user_id
GROUP BY
    u.id
ORDER BY total_revenue DESC;