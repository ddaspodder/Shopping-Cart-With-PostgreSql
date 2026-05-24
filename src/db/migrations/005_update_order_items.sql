ALTER TABLE order_items
ADD CONSTRAINT price_non_negative CHECK (price >= 0),
ADD CONSTRAINT unique_order_product UNIQUE (order_id, product_id);