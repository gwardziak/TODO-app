import React, { FunctionComponent, useState } from "react";

type Props = {
  id: string;
  value: string;
  removeTodo: (id: string) => void;
  editTodo?: (id: string) => void;
};

export const Todo: FunctionComponent<Props> = ({ id, value, removeTodo }) => {
  return (
    <>
      <li onClick={() => removeTodo(id)}>{value}</li>
    </>
  );
};
