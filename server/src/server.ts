import express from "express";
import cors from "cors";
import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { createExpressServer } from "routing-controllers";
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

    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`)
    );
  })
  .catch((error) => console.log("Database connection err: " + error));
