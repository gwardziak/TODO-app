import React, { FunctionComponent, useState } from "react";
import styled, { css } from "styled-components";
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
      <TodoContainer>
        <CheckBoxInput
          checked={complete}
          readOnly
          type="checkbox"
          onClick={() => completeTodo(id)}
        />
        {!isEdit ? (
          <>
            <TodoLabel complete={complete}>{value}</TodoLabel>
            <Button color={ButtonType.Edit} onClick={() => setIsEdit(!isEdit)}>
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
        <Button color={ButtonType.Delete} onClick={() => removeTodo(id)}>
          Delete
        </Button>
        <p>Starting date: {new Date(startsAt).toString()}</p>
      </TodoContainer>
    </>
  );
};

const TodoContainer = styled("li")`
  overflow: hidden;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  clear: both;
  list-style: none;
  display: block;
`;

const CheckBoxInput = styled("input")`
  margin: 0 10px;
  position: relative;
  top: 15px;
`;

type TodoLabel = {
  complete: boolean;
};

const TodoLabel = styled("label")<TodoLabel>`
  font-size: 18px;
  line-height: 40px;
  width: 237px;
  padding: 0 0 0 11px;
  font-family: Lato, sans-serif;

  ${(props) =>
    props.complete &&
    css`
      text-decoration: line-through;
      color: #888;
    `}
`;

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
