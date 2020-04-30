import React, { FunctionComponent, useState } from "react";

export type TodoType = {
  id: number;
  text: string;
  complete: boolean;
  removeTodo: (id: number) => void;
  completeTodo: (id: number) => void;
  editTodo: (id: number, value: string) => void;
};

export const Todo: FunctionComponent<TodoType> = (props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { id, text, complete, removeTodo, completeTodo, editTodo } = props;
  const [value, setValue] = useState<string>(text || "");

  return (
    <>
      {complete && (
        <li>
          <input type="checkbox" checked onClick={() => completeTodo(id)} />

          {!isEdit ? (
            <>
              <label>{text}</label>
              <input type="text" />
              <button className="edit" onClick={() => setIsEdit(!isEdit)}>
                Edit
              </button>
            </>
          ) : (
            <>
              <label className="editMode">{value}</label>
              <input
                className="editMode"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClick={() => {
                  setIsEdit(!isEdit);
                  editTodo(id, value);
                }}
              />
              <button className="edit">Edit</button>
            </>
          )}

          <button className="delete" onClick={() => removeTodo(id)}>
            Delete
          </button>
        </li>
      )}

      {!complete && (
        <li>
          <input type="checkbox" onClick={() => completeTodo(id)} />

          {!isEdit ? (
            <>
              <label>{value}</label>
              <input type="text" />
              <button className="edit" onClick={() => setIsEdit(!isEdit)}>
                Edit
              </button>
            </>
          ) : (
            <>
              <label className="editMode">{value}</label>
              <input
                className="editMode"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button
                className="edit"
                onClick={() => {
                  setIsEdit(!isEdit);
                  editTodo(id, value);
                }}
              >
                Edit
              </button>
            </>
          )}
          <button className="delete" onClick={() => removeTodo(id)}>
            Delete
          </button>
        </li>
      )}
    </>
  );
};
