import React, { FunctionComponent, useState, useEffect } from "react";
import { Todo } from "./Todo";
import { v4 as uuid } from "uuid";
import useFetch from "use-http";

type TodosType = {
  id: string;
  text: string;
  complete: boolean;
  edit: boolean;
}[];

export const TODOS: FunctionComponent = () => {
  const [todos, setTodos] = useState<TodosType>([]);
  const [value, setValue] = useState<string>("");
  //
  const [request, response] = useFetch("http://localhost:5000/todos");

  // componentDidMount
  useEffect(() => {
    initializeTodos();
  }, []);

  async function initializeTodos() {
    const initialTodos = await request.get("/");

    if (response.ok) setTodos(initialTodos);
  }
  //
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    addTODO(value);

    e.preventDefault();
    setValue("");
  };

  const addTODO = (text: string): void => {
    setTodos([
      ...todos,
      {
        id: uuid(),
        text,
        complete: false,
        edit: false,
      },
    ]);
    console.log(todos);
  };

  const editTodo = (id: string): void => {
    const index = todos.findIndex((todo) => todo.id === id);
    const newTodos: TodosType = [...todos];
    newTodos[index].text = "new";

    setTodos(newTodos);
  };

  const remvoveTODO = (id: string): void => {
    const index = todos.findIndex((todo) => todo.id === id);

    setTodos(
      todos.slice(0, index).concat(todos.slice(index + 1, todos.length))
    );
  };

  const completeTodo = (id: string): void => {
    const index = todos.findIndex((todo) => todo.id === id);
    const newTodos: TodosType = [...todos];
    newTodos[index].complete = !newTodos[index].complete;

    setTodos(newTodos);
  };

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <br />
        <input type="submit" value="Add Todo" required />
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo
            {...todo}
            removeTodo={remvoveTODO}
            editTodo={editTodo}
            completeTodo={completeTodo}
          />
        ))}
      </ul>
    </>
  );
};
