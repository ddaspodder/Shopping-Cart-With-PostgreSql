DROP TYPE IF EXISTS roles;

CREATE TYPE roles AS ENUM (
  'admin',
  'user'
);
