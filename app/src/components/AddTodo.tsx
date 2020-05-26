import React, { useState } from "react";
import { TodoDatePicker } from "./DatePicker";
import { Input } from "./../ui/Input";
import { Button, ButtonType } from "./../ui/Button";
import styled from "styled-components";

export type AddTodoState = {
  title: string;
  date: {
    err: Error | null;
    startsAt: Date;
  };
};

export type ErrorStatus = {
  err: Error | null;
};

type AddTodoProps = {
  onAdd: (todo: AddTodoState) => Promise<AddStatus>;
};

export type DateType = {
  err: Error | null;
  startsAt: Date;
};
type AddStatus = {
  err: Error | null;
};

export const AddTodo = (props: AddTodoProps) => {
  const { onAdd } = props;
  const [todo, setTodo] = useState<AddTodoState>({
    title: "",
    date: {
      startsAt: new Date(),
      err: null,
    },
  });

  const setDate = (date: DateType) => setTodo({ date, title: todo.title });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const status = await onAdd(todo);
    console.log(status);

    if (status.err) return;

    setTodo({
      title: "",
      date: {
        startsAt: new Date(),
        err: null,
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TodoHeaderLabel>Add Item</TodoHeaderLabel>
        <TodoDatePicker date={todo.date} setDate={setDate} />
        <Input
          width="318"
          display="inline"
          type="text"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          value={todo.title}
        />
        <Button color={ButtonType.Add} type="submit">
          Add
        </Button>
      </form>
    </>
  );
};

const TodoHeaderLabel = styled("label")`
  color: #333;
  font-weight: 700;
  font-size: 15px;
  border-bottom: 2px solid #333;
  padding: 30px 0 10px;
  text-transform: uppercase;
  display: block;
  margin: 0 0 20px;
`;
