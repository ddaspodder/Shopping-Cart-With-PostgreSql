-- Active: 1779614499007@@ep-billowing-feather-apl4nno8-pooler.c-7.us-east-1.aws.neon.tech@5432@shopping_cart_prisma@public
--top 3 by descending total_revenue
SELECT p.*, COALESCE(SUM(oi.price), 0) as total_revenue
FROM products as p
    LEFT JOIN order_items AS oi ON p.id = oi.product_id
GROUP BY
    p.id
ORDER BY total_revenue DESC
LIMIT 3;

--top 3 by ascending order of total revenue
SELECT *
FROM (
        SELECT p.*, COALESCE(SUM(oi.price), 0) as total_revenue
        FROM products as p
            LEFT JOIN order_items AS oi ON p.id = oi.product_id
        GROUP BY
            p.id
        ORDER BY total_revenue DESC
        LIMIT 3
    ) as top_3_products
ORDER BY total_revenue ASC;

--top 3 with rank in desc order of total revenue
SELECT
    p.*,
    COALESCE(SUM(oi.price), 0) as total_revenue,
    DENSE_RANK() OVER (
        ORDER BY COALESCE(SUM(oi.price), 0) DESC
    ) AS revenue_rank
FROM products as p
    LEFT JOIN order_items AS oi ON p.id = oi.product_id
GROUP BY
    p.id
LIMIT 3;

--top 3 with rank in asc order of total revenue
SELECT *
FROM (
        SELECT
            p.*, COALESCE(SUM(oi.price), 0) AS total_revenue, DENSE_RANK() OVER (
                ORDER BY COALESCE(SUM(oi.price), 0) DESC
            ) AS revenue_rank
        FROM products AS p
            LEFT JOIN order_items AS oi ON p.id = oi.product_id
        GROUP BY
            p.id
        LIMIT 3
    ) as ranked_products
WHERE
    revenue_rank <= 3
ORDER BY revenue_rank DESC;

--running sum
SELECT
    oi.id as order_id,
    p.id product_id,
    oi.price,
    SUM(oi.price) OVER (
        PARTITION BY
            p.id
        ORDER BY oi.price, order_id
    ) as total_revenue
FROM products as p
    INNER JOIN order_items AS oi ON p.id = oi.product_id