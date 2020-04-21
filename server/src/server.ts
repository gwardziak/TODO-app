import express from "express";
import cors from "cors";
import routes from "./routes";
import "dotenv/config";
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

createConnection()
  .then(async (connection) => {
    console.log("Successfully connected to a database");

    const app: express.Application = express();

    app.use(cors());

    app.use("/todos", routes.todo);

    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`)
    );
  })
  .catch((error) => console.log("Database connection err: " + error));
