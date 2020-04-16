import React, { FunctionComponent, useState } from "react";

type Props = {
  id: string;
  value: string;
  removeTodo: (id: string) => void;
  editTodo?: (id: string) => void;
};

export const TODO: FunctionComponent<Props> = ({ id, value, removeTodo }) => {
  return (
    <div>
      <li onClick={() => removeTodo(id)}>{value}</li>
      <input type="text" onClick={() => removeTodo(id)}></input>
    </div>
  );
};
