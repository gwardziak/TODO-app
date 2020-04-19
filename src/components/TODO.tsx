import React, { FunctionComponent, useState } from "react";

export type TodoType = {
  id: string;
  text: string;
  complete: boolean;
  edit: boolean;
  removeTodo: (id: string) => void;
  editTodo: (id: string) => void;
  completeTodo: (id: string) => void;
};

export const Todo: FunctionComponent<TodoType> = (props) => {
  const {
    id,
    text,
    complete,
    edit,
    removeTodo,
    editTodo,
    completeTodo,
  } = props;
  return (
    <>
      <li key={id}>
        <span onClick={() => completeTodo(id)}>{text}</span>{" "}
        <button onClick={() => removeTodo(id)}>x</button>
        <div>{complete ? "Complete" : "Incomplete"}</div>
      </li>
    </>
  );
};
