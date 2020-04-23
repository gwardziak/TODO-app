import { Router } from "express";
import { getRepository, createQueryBuilder } from "typeorm";
import { Todo } from "../db/entity/Todo";

const router: Router = Router();

router.get("/", async (req, res) => {
  const todos = await getRepository(Todo).find();
  return res.json(todos);
});

router.get("/:todoId", async (req, res) => {
  const result = await getRepository(Todo).findOne(req.params.todoId);
  return res.json(result);
});

router.post("/", async (req, res) => {
  const todo = new Todo(req.body);
  const result = await getRepository(Todo).save(todo);
  return res.send(result);
});

router.put("/:todoId", async (req, res) => {
  const result = await getRepository(Todo)
    .createQueryBuilder()
    .update(Todo)
    .set(req.body)
    .where("id = :id", { id: req.params.todoId })
    .execute();

  return res.send(result);
});

router.delete("/:todoId", async (req, res) => {
  const result = await getRepository(Todo).delete(req.params.todoId);
  return res.json(result);
});

export default router;
