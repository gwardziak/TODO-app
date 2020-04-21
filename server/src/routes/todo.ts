import { Router } from "express";
import { getConnection } from "typeorm";
import { Todo } from "../db/entity/Todo";

const router: Router = Router();

function getTodoRepository() {
  return getConnection().getRepository<Todo[]>(Todo);
}

//const todoRepository = getConnection().getRepository(Todo);

router.get("/", async (req, res) => {
  let savedTodos = await getTodoRepository().find();
  return res.json(savedTodos);
});

router.delete("/:todoId", async (req, res) => {
  const result = await getTodoRepository().delete(req.params.todoId);
  return res.json(result);
});

/*
router.get("/:messageId", (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});
*/
/*
router.post("/", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };
  req.context.models.messages[id] = message;
  return res.send(message);
});

*/
export default router;
