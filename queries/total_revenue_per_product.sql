SELECT p.*, COALESCE(SUM(oi.price), 0) as total_revenue
FROM products as p
    LEFT JOIN order_items AS oi ON p.id = oi.product_id
GROUP BY
    p.id
ORDER BY total_revenue DESC;