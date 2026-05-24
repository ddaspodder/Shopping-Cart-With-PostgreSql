ALTER TABLE orders
ADD CONSTRAINT total_amount_non_negative CHECK (total_amount >= 0);