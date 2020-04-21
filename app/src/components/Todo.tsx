import React, { FunctionComponent, useState } from "react";

export type TodoType = {
  id: number;
  text: string;
  complete: boolean;
  removeTodo: (id: number) => void;
  completeTodo: (id: number) => void;
};

export const Todo: FunctionComponent<TodoType> = (props) => {
  const { id, text, complete, removeTodo, completeTodo } = props;

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
