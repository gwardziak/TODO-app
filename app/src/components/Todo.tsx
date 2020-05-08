import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { Button, ButtonType } from "./../ui/Button";

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
        <TodoContainer>
          <CheckBoxInput
            readOnly
            type="checkbox"
            onClick={() => completeTodo(id)}
          />
          {!isEdit ? (
            <>
              <TodoLabel>{value}</TodoLabel>
              <Button
                color={ButtonType.Edit}
                onClick={() => setIsEdit(!isEdit)}
              >
                Edit
              </Button>
            </>
          ) : (
            <>
              <TodoToggleEditMode
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button
                color={ButtonType.Edit}
                onClick={() => {
                  setIsEdit(!isEdit);
                  editTodo(id, value);
                }}
              >
                Edit
              </Button>
            </>
          )}
          <Button
            color={ButtonType.Delete}
            className="delete"
            onClick={() => removeTodo(id)}
          >
            Delete
          </Button>
          <p>Starting date: {new Date(startsAt).toString()}</p>
        </TodoContainer>
      )}
      {complete && (
        <TodoContainer>
          <CheckBoxInput
            checked
            readOnly
            type="checkbox"
            onClick={() => completeTodo(id)}
          />
          {!isEdit ? (
            <>
              <TodoLabelCompelted>{value}</TodoLabelCompelted>
              <Button
                color={ButtonType.Edit}
                onClick={() => setIsEdit(!isEdit)}
              >
                Edit
              </Button>
            </>
          ) : (
            <>
              <TodoToggleEditMode
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button
                color={ButtonType.Edit}
                className="edit"
                onClick={() => {
                  setIsEdit(!isEdit);
                  editTodo(id, value);
                }}
              >
                Edit
              </Button>
            </>
          )}
          <Button color={ButtonType.Delete} onClick={() => removeTodo(id)}>
            Delete
          </Button>
          <p>Startin date: {new Date(startsAt).toString()}</p>
        </TodoContainer>
      )}
    </>
  );
};

const TodoToggleEditMode = styled("input")`
  border: 1px solid #ddd;
  padding: 10px;
  width: 226px;
  font-size: 18px;
  height: 18px;
  line-height: 18px;
  display: block;
  background: #fff;
  border-radius: 6px;
  font-family: Lato, sans-serif;
  color: #888;
  margin: 0;
`;
//ok
const TodoContainer = styled("li")`
  overflow: hidden;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  clear: both;
  list-style: none;
  display: block;
`;
//syf
export enum LabelType {
  Normal = "none",
  Crossed = "line-through",
}

export type Label =
  | {
      type: LabelType.Normal;
      "text-decoration": string;
    }
  | {
      type: LabelType.Crossed;
      "text-decoration": string;
      color: string;
    };

const TodoHeaderLabel = styled("label")<Label>`
  font-size: 18px;
  line-height: 40px;
  width: 237px;
  padding: 0 0 0 11px;
  font-family: Lato, sans-serif;
  color: ${(props) => props.color};
`;

const TodoLabelCompelted = styled("label")`
  font-size: 18px;
  line-height: 40px;
  width: 237px;
  padding: 0 0 0 11px;
  font-family: Lato, sans-serif;
  text-decoration: line-through;
  color: #888;
`;

const TodoLabel = styled("label")`
  font-size: 18px;
  line-height: 40px;
  width: 237px;
  padding: 0 0 0 11px;
  font-family: Lato, sans-serif;
`;
//ok
const CheckBoxInput = styled("input")`
  margin: 0 10px;
  position: relative;
  top: 15px;
`;
