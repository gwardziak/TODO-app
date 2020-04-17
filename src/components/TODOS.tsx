import React, { FunctionComponent, useState, useRef } from "react";
import { Todo } from "./Todo";
import { v4 as uuid } from "uuid";

type TodosType = {
  id: string;
  value: string;
}[];

export const TODOS: FunctionComponent = () => {
  const [items, setItems] = useState<TodosType>([]);
  const [todo, setTodo] = useState<string>("");

  const addTODO = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    setItems([
      ...items,
      {
        id: uuid(),
        value: todo,
      },
    ]);

    setTodo("");
  };

  const remvoveTODO = (id: string): void => {
    const index = items.findIndex((todo) => todo.id === id);

    setItems(
      items.slice(0, index).concat(items.slice(index + 1, items.length))
    );
  };

  return (
    <>
      <form onSubmit={addTODO}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <br />
        <input type="submit" value="Add Todo" />
      </form>
      <ul>
        {items.map((item) => (
          <Todo id={item.id} value={item.value} removeTodo={remvoveTODO} />
        ))}
      </ul>
    </>
  );
};
