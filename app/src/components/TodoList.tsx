import React from "react";
import { Todo } from "./Todo";
import styled from "styled-components";

export type TodoListProps = {
  listName: string;
  todos: Todo[];

  onEdit: (id: number, update: Partial<Omit<Todo, "id">>) => void;
  onDelete: (id: number) => void;
};

export const TodoList = (props: TodoListProps) => {
  const { listName, todos, onEdit, onDelete } = props;
  return (
    <>
      <TodoHeaderLabel>{listName}</TodoHeaderLabel>
      <TodoListCointainer>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </TodoListCointainer>
    </>
  );
};

const TodoListCointainer = styled("ul")`
  margin: 0;
  padding: 0;
  display: block;
  overflow: hidden;
`;

const TodoHeaderLabel = styled("label")`
  color: #333;
  font-weight: 700;
  font-size: 15px;
  border-bottom: 2px solid #333;
  padding: 30px 0 10px;
  text-transform: uppercase;
  display: block;
  margin: 0;
`;
