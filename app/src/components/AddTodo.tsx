import React, { FunctionComponent, useState } from "react";
import { TodoDatePicker } from "./DatePicker";
import { Input } from "./../ui/Input";
import { Button, ButtonType } from "./../ui/Button";
import styled from "styled-components";

type AddTodoState = {
  title: string;
  startsAt: {
    value: Date | string;
    isDate: boolean;
    error: string;
  };
};

type AddTodoProps = {
  onAdd: (title: string, startsAt: Date) => void;
};

export const AddTodo = (props: AddTodoProps) => {
  const { onAdd } = props;
  const [todo, setTodo] = useState<AddTodoState>({
    title: "",
    startsAt: {
      value: new Date(),
      isDate: true,
      error: "",
    },
  });

  const setDate = (propertka: any) =>
    setTodo({ startsAt: propertka, title: todo.title });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    //@ts-ignore
    onAdd(todo.title, todo.startsAt.value);

    e.preventDefault();
    setTodo({
      title: "",
      startsAt: {
        value: new Date(),
        isDate: true,
        error: "",
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TodoHeaderLabel>Add Item</TodoHeaderLabel>
        <TodoDatePicker date={todo.startsAt} setTodo={setDate} />
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
