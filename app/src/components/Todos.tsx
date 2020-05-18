import React, { FunctionComponent, useState, useEffect } from "react";
import { Todo } from "./Todo";
import useFetch from "use-http";
//import "../todo.css";
import { TodoDatePicker } from "./DatePicker";
import styled from "styled-components";
import { Button, ButtonType } from "./../ui/Button";
import { Input } from "./../ui/Input";

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
    <TodoContainer>
      <h1>Todo List</h1>
      <p>
        <form onSubmit={handleSubmit}>
          <TodoHeaderLabel margin="0 0 20px">Add Item</TodoHeaderLabel>
          <TodoDatePicker />
          <Input
            width="318"
            display="inline"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            id="new-task"
          />

          <Button color={ButtonType.Add} type="submit">
            Add
          </Button>
        </form>
      </p>
      <TodoHeaderLabel margin="0">Todo</TodoHeaderLabel>
      <TodoListCointainer>
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
      </TodoListCointainer>

      <TodoHeaderLabel margin="0">Completed</TodoHeaderLabel>
      <TodoListCointainer>
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
      </TodoListCointainer>
    </TodoContainer>
  );
};

const TodoContainer = styled("div")`
  display: block;
  width: 670px;
  margin: 100px auto 0;
`;

const TodoListCointainer = styled("ul")`
  margin: 0;
  padding: 0;
  display: block;
  overflow: hidden;
`;

type TodoHeaderLabelStyle = {
  margin: string;
};

const TodoHeaderLabel = styled("label")<TodoHeaderLabelStyle>`
  color: #333;
  font-weight: 700;
  font-size: 15px;
  border-bottom: 2px solid #333;
  padding: 30px 0 10px;
  text-transform: uppercase;
  display: block;
  margin: ${(props) => props.margin};
`;
