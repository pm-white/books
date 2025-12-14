import pgPromise from "pg-promise";

const pgp = pgPromise();

const base = `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export let db = pgp(
  process.env.NODE_ENV === "production"
    ? `postgres://${base}?sslmode=require`
    : `postgres://${base}`,
);
