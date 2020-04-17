import React, { FunctionComponent, useState } from "react";

type Props = {
  id: string;
  value: string | undefined;
  removeTodo: (id: string) => void;
  editTodo?: (id: string) => void;
};

export const TODO: FunctionComponent<Props> = ({ id, value, removeTodo }) => {
  return (
    <>
      <li onClick={() => removeTodo(id)}>{value}</li>
    </>
  );
};
