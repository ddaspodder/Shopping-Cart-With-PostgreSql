ALTER TABLE products
ALTER name SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT name_not_empty CHECK (name != ''),
ADD CONSTRAINT price_non_negative CHECK (price >= 0);