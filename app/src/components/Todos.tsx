import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoList } from "./TodoList";
import useFetch from "use-http";
import styled from "styled-components";
import { AddTodo, AddTodoState, ErrorStatus } from "./AddTodo";

type TodosState = {
  todos: Todo[];
};

export const Todos = () => {
  const [state, setState] = useState<TodosState>({ todos: [] });
  const [request, response] = useFetch("http://localhost:5000");

  // componentDidMount
  useEffect(() => {
    initializeTodos();
  }, []);

  const initializeTodos = async () => {
    const initialTodos = await request.get("/todos");

    if (response.ok) setState({ todos: initialTodos });
  };

  const addTodo = async (todo: AddTodoState): Promise<ErrorStatus> => {
    if (todo.date.err) return { err: todo.date.err };

    const newTodo: Todo = await request.post("/todos", {
      text: todo.title,
      complete: false,
      startsAt: todo.date.startsAt.toISOString(),
    });

    if (response.ok) {
      setState({ todos: [...state.todos, newTodo] });
      return { err: null };
    }

    return { err: new Error("Response failed") };
  };

  const editTodo = async (id: number, update: Partial<Omit<Todo, "id">>) => {
    const index = state.todos.findIndex((todo) => todo.id === id);
    const newTodos = [...state.todos];
    newTodos[index] = { ...newTodos[index], ...update };

    await request.put(`/todos/${id}`, {
      ...update,
    });
    if (response.ok) setState({ todos: newTodos });
  };

  const remvoveTodo = async (id: number) => {
    await request.delete(`/todos/${id}`);

    if (response.ok) {
      const index = state.todos.findIndex((todo) => todo.id === id);
      setState({
        todos: state.todos
          .slice(0, index)
          .concat(state.todos.slice(index + 1, state.todos.length)),
      });
    }
  };

  return (
    <TodoContainer>
      <h1>Todo List</h1>
      <AddTodo onAdd={addTodo}></AddTodo>
      <TodoList
        listName="Todo"
        onDelete={remvoveTodo}
        onEdit={editTodo}
        todos={state.todos.filter((todo) => !todo.complete)}
      />
      <TodoList
        listName="Completed"
        onDelete={remvoveTodo}
        onEdit={editTodo}
        todos={state.todos.filter((todo) => todo.complete)}
      />
    </TodoContainer>
  );
};

const TodoContainer = styled("div")`
  display: block;
  width: 670px;
  margin: 100px auto 0;
`;
