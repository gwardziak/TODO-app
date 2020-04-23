import React, { FunctionComponent } from "react";

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
      {complete && (
        <li>
          <input type="checkbox" checked onClick={() => completeTodo(id)} />
          <label>{text}</label>
          <input type="text" />
          <button className="edit">Edit</button>
          <button className="delete" onClick={() => removeTodo(id)}>
            Delete
          </button>
        </li>
      )}

      {!complete && (
        <li>
          <input type="checkbox" onClick={() => completeTodo(id)} />
          <label>{text}</label>
          <input type="text" />
          <button className="edit">Edit</button>
          <button className="delete" onClick={() => removeTodo(id)}>
            Delete
          </button>
        </li>
      )}
    </>
  );
};

/*

*/
//
/*
        <li className="editMode">
          <input type="checkbox" />
          <label>Go Shopping</label>
          <input type="text" value="Go Shopping" />
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
        </li>

*/
