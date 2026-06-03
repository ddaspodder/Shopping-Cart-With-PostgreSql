ALTER TABLE users
ALTER email SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT email_not_empty CHECK (email != ''),
ADD CONSTRAINT password_not_empty CHECK (password != ''),
ADD CONSTRAINT role_not_null CHECK (role IS NOT NULL);