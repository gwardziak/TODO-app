import React, { FunctionComponent, useState } from "react";

export type TodoType = {
  id: number;
  text: string;
  complete: boolean;
  removeTodo: (id: number) => void;
  completeTodo: (id: number) => void;
  editTodo: (id: number) => void;
};

export const Todo: FunctionComponent<TodoType> = (props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { id, text, complete, removeTodo, completeTodo, editTodo } = props;

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
              <label className="editMode">{text}</label>
              <input className="editMode" type="text" value={text} />
              <button className="edit" onClick={() => setIsEdit(!isEdit)}>
                Edit
              </button>
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
              <label>{text}</label>
              <input type="text" />
              <button className="edit" onClick={() => setIsEdit(!isEdit)}>
                Edit
              </button>
            </>
          ) : (
            <>
              <label className="editMode">{text}</label>
              <input className="editMode" type="text" value={text} />
              <button className="edit" onClick={() => setIsEdit(!isEdit)}>
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

/*
   {!isEditing && (
            <button className="edit" onClick={() => editTodo(id)}>
              Edit
            </button>
          )}
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
