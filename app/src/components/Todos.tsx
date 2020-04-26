import React, { FunctionComponent, useState, useEffect } from "react";
import { Todo } from "./Todo";
import useFetch from "use-http";
import "../todo.css";

type TodoOptions = {
  id: number;
  text: string;
  complete: boolean;
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
    const newTodo = await request.post("/todos", {
      text,
      complete: false,
    });

    if (response.ok) setTodos([...todos, newTodo]);
  };

  /*
  const editTodo = (id: number): void => {
    const index = todos.findIndex((todo) => todo.id === id);
    const newTodos: TodosType = [...todos];
    newTodos[index].text = "new";

    setTodos(newTodos);
  };
*/

  const remvoveTodo = async (id: number) => {
    await request.delete(`/todos/${id}`);

    console.log(response);

    if (response.ok) {
      console.log("nie udalo sie kurwa");
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
    <>
      <h1>Todo List</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="new-task">Add Item</label>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          id="new-task"
        />
        <input type="submit" value="Add" required />
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
            />
          ))}
      </ul>
    </>
  );
};

/*








        <li className="editMode">
          <input type="checkbox" />
          <label>Go Shopping</label>
          <input type="text" value="Go Shopping" />
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
        </li>

*/
