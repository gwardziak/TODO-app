import React, { FunctionComponent, useState } from "react";

export type TodoType = {
  id: number;
  text: string;
  complete: boolean;
  startsAt: Date;
  removeTodo: (id: number) => void;
  completeTodo: (id: number) => void;
  editTodo: (id: number, value: string) => void;
};

export const Todo: FunctionComponent<TodoType> = (props) => {
  const {
    id,
    text,
    complete,
    startsAt,
    removeTodo,
    completeTodo,
    editTodo,
  } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);

  return (
    <>
      {!complete && (
        <li>
          <input readOnly type="checkbox" onClick={() => completeTodo(id)} />

          {!isEdit ? (
            <>
              <label>{value}</label>
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
          <p>Starting date: {new Date(startsAt).toString()}</p>
        </li>
      )}

      {complete && (
        <li>
          <input readOnly type="checkbox" onClick={() => completeTodo(id)} />

          {!isEdit ? (
            <>
              <label>{value}</label>
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
          <p>Startin date: {new Date(startsAt).toString()}</p>
        </li>
      )}
    </>
  );
};
