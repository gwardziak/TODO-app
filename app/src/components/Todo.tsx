import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Button, ButtonType } from "./../ui/Button";
import { Input } from "./../ui/Input";
import { FormatDate } from "../utils/FormatDate";

export type Todo = {
  id: number;
  text: string;
  complete: boolean;
  startsAt: Date;
};

export type TodoProps = Todo & {
  onEdit: (id: number, update: Partial<Omit<Todo, "id">>) => void;
  onDelete: (id: number) => void;
};

export const Todo = (props: TodoProps) => {
  const { id, text, complete, startsAt, onEdit, onDelete } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);

  return (
    <>
      <TodoContainer>
        <CheckBoxInput
          checked={complete}
          readOnly
          type="checkbox"
          onClick={() => onEdit(id, { complete: !complete })}
        />
        {!isEdit ? (
          <>
            <TodoLabel complete={complete}>
              {FormatDate.datePattern(new Date(startsAt))}
            </TodoLabel>
            <TodoLabel complete={complete}>{value}</TodoLabel>
            <Button color={ButtonType.Edit} onClick={() => setIsEdit(!isEdit)}>
              Edit
            </Button>
          </>
        ) : (
          <>
            <TodoLabel complete={complete}>
              {FormatDate.datePattern(new Date(startsAt))}
            </TodoLabel>
            <Input
              width="226"
              display="block"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              color={ButtonType.Edit}
              onClick={() => {
                setIsEdit(!isEdit);
                onEdit(id, { text: value });
              }}
            >
              Edit
            </Button>
          </>
        )}
        <Button color={ButtonType.Delete} onClick={() => onDelete(id)}>
          Delete
        </Button>
      </TodoContainer>
    </>
  );
};
// <p>Starting date: {new Date(startsAt).toString()}</p>
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
