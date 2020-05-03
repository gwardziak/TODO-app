import React, { FunctionComponent, useState, useEffect } from "react";
import { Todo } from "./Todo";
import useFetch from "use-http";
import "../todo.css";

export type TodoOptions = {
  id: number;
  text: string;
  complete: boolean;
  startsAt: Date;
};

export const Todos: FunctionComponent = () => {
  const [todos, setTodos] = useState<TodoOptions[]>([]);
  const [value, setValue] = useState<string>("");
  const [request, response] = useFetch("http://localhost:5000");

  // componentDidMount
  useEffect(() => {
    initializeTodos();
  }, []);

  const initializeTodos = async () => {
    const initialTodos = await request.get("/todos");

    if (response.ok) setTodos(initialTodos);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    addTodo(value);

    e.preventDefault();
    setValue("");
  };

  const addTodo = async (text: string) => {
    // const todoDate: Date = new Date();

    const newTodo = await request.post("/todos", {
      text,
      complete: false,
      startsAt: new Date(new Date().toISOString()),
    });

    if (response.ok) {
      //  newTodo.startsAt = todoDate;
      setTodos([...todos, newTodo]);
    }
  };

  const editTodo = async (id: number, value: string) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const newTodos: TodoOptions[] = [...todos];
    newTodos[index].text = value;

    await request.put(`/todos/${id}`, {
      text: newTodos[index].text,
    });
    if (response.ok) setTodos(newTodos);
  };

  const remvoveTodo = async (id: number) => {
    await request.delete(`/todos/${id}`);

    if (response.ok) {
      const index = todos.findIndex((todo) => todo.id === id);
      setTodos(
        todos.slice(0, index).concat(todos.slice(index + 1, todos.length))
      );
    }
  };

  const completeTodo = async (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const newTodos: TodoOptions[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    await request.put(`/todos/${id}`, {
      complete: newTodos[index].complete,
    });

    if (response.ok) {
      setTodos(newTodos);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-task">Add Item</label>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          id="new-task"
        />
        <p>
          <input type="submit" value="Add" required />
        </p>
      </form>

      <h3>Todo</h3>
      <ul id="incomplete-tasks">
        {todos
          .filter((todo) => todo.complete === false)
          .map((filteredTodo) => (
            <Todo
              key={filteredTodo.id}
              {...filteredTodo}
              removeTodo={remvoveTodo}
              completeTodo={completeTodo}
              editTodo={editTodo}
            />
          ))}
      </ul>

      <h3>Completed</h3>
      <ul id="completed-tasks">
        {todos
          .filter((todo) => todo.complete === true)
          .map((filteredTodo) => (
            <Todo
              key={filteredTodo.id}
              {...filteredTodo}
              removeTodo={remvoveTodo}
              completeTodo={completeTodo}
              editTodo={editTodo}
            />
          ))}
      </ul>
    </div>
  );
};
