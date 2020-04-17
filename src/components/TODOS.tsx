import React, { FunctionComponent, useState, useRef } from "react";
import { TODO } from "./TODO";
import { v4 as uuid } from "uuid";

type TODOSType = {
  id: string;
  value: string | undefined;
}[];

export const TODOS: FunctionComponent = () => {
  const [items, manageItems] = useState<TODOSType>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  /*
  const addTODO = (): void => {
    manageItems([
      ...items,
      {
        id: uuid(),
        value: Math.random() * 100 + "1", //val input
      },
    ]);
  };
*/

  const addTODO = (event: React.MouseEvent<HTMLButtonElement>): void => {
    manageItems([
      ...items,
      {
        id: uuid(),
        value: inputRef.current?.value,
      },
    ]);
    // console.log(inputRef);
    //inputRef.current?.reset();
    //event.target.reset();
    // refs.inputRef.value = "";
    event.preventDefault();
  };
  const remvoveTODO = (id: string): void => {
    const index = items.findIndex((todo) => todo.id === id);

    manageItems(
      items.slice(0, index).concat(items.slice(index + 1, items.length))
    );
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={addTODO}>Add a TODO</button>

      <ul>
        {items.map((item) => (
          <TODO id={item.id} value={item.value} removeTodo={remvoveTODO} />
        ))}
      </ul>
    </>
  );
};
