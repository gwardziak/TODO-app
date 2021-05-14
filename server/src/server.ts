import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { createConnection } from "typeorm";
import { TodoController } from "./controllers/TodoController";

createConnection()
  .then(async (connection) => {
    console.log("Successfully connected to a database");

    const app: express.Application = createExpressServer({
      cors: true,
      controllers: [TodoController],
      validation: {
        forbidUnknownValues: true,
        whitelist: true,
        // validationError: {
        //   target: false
        // }
      },
    });

    app.listen(process.env.PORT ?? 5000, () =>
      console.log(`Example app listening on port ${process.env.PORT || 5000}!`)
    );
  })
  .catch((error) => console.log("Database connection err: " + error));
