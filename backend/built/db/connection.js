import pgPromise from "pg-promise";
var pgp = pgPromise();
var base = "".concat(process.env.DB_USERNAME, ":").concat(process.env.DB_PASSWORD, "@").concat(process.env.DB_HOST, ":").concat(process.env.DB_PORT, "/").concat(process.env.DB_NAME);
export var db = pgp(process.env.NODE_ENV === "production"
    ? "postgres://".concat(base, "?sslmode=require")
    : "postgres://".concat(base));
