import { Router } from "express";
import { getConnection } from "typeorm";
import { Todo } from "../db/entity/Todo";

const router: Router = Router();

const getTodoRepository = () => getConnection().getRepository<Todo[]>(Todo);

router.get("/", async (req, res) => {
  const todos = await getTodoRepository().find();
  return res.json(todos);
});

router.get("/:todoId", async (req, res) => {
  const result = await getTodoRepository().findOne(req.params.todoId);
  return res.json(result);
});

router.post("/", async (req, res) => {
  const todo = await getTodoRepository().create(req.body);
  const result = await getTodoRepository().save(todo);
  return res.send(result);
});

router.put("/:todoId", async (req, res) => {
  console.log(req.params);
  const todo = await getTodoRepository().findOne(req.params.todoId);
  console.log(todo);
  //check undefined
  getTodoRepository().merge(todo!, req.body);
  //check undefined
  const result = await getTodoRepository().save(todo!);
  return res.send(result);
});

router.delete("/:todoId", async (req, res) => {
  const result = await getTodoRepository().delete(req.params.todoId);
  return res.json(result);
});

export default router;
