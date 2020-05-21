import React, { FunctionComponent, useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoList } from "./TodoList";
import useFetch from "use-http";
import styled from "styled-components";

type TodosState = {
  todos: Todo[];
};

export const Todos: FunctionComponent = () => {
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

  const editTodo = async (id: number, update: Partial<Omit<Todo, "id">>) => {
    const index = state.todos.findIndex((todo) => todo.id === id);
    const newTodos = [...state.todos];
    newTodos[index] = { ...newTodos[index], ...update };

    await request.put(`/todos/${id}`, {
      ...update,
    });
    if (response.ok) setState({ todos: newTodos });
  };

  const completeTodo = async (id: number) => {
    const index = state.todos.findIndex((todo) => todo.id === id);
    const newTodos: Todo[] = [...state.todos];
    newTodos[index].complete = !newTodos[index].complete;
    await request.put(`/todos/${id}`, {
      complete: newTodos[index].complete,
    });

    if (response.ok) {
      setState({ todos: newTodos });
    }
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
      <TodoList
        listName="Todo"
        onComplete={completeTodo}
        onDelete={remvoveTodo}
        onEdit={editTodo}
        todos={state.todos.filter((todo) => !todo.complete)}
      />
      <TodoList
        listName="Completed"
        onComplete={completeTodo}
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
