import React, { FunctionComponent, useState } from "react";
import { TODO } from "./TODO";
import { v4 as uuid } from "uuid";

type TODOSType = {
  id: string;
  value: string;
}[];

export const TODOS: FunctionComponent = () => {
  const [items, manageItems] = useState<TODOSType>([]);

  const addTODO = (): void => {
    manageItems([
      ...items,
      {
        id: uuid(),
        value: Math.random() * 100 + "1", //val input
      },
    ]);
  };

  const remvoveTODO = (id: string): void => {
    const index = items.findIndex((todo) => todo.id === id);

    manageItems(
      items.slice(0, index).concat(items.slice(index + 1, items.length))
    );
  };

  return (
    <>
      <button onClick={addTODO}>Add a number</button>

      <ul>
        {items.map((item) => (
          <TODO id={item.id} value={item.value} removeTodo={remvoveTODO} />
        ))}
      </ul>
    </>
  );
};
