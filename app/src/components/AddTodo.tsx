import React, { FunctionComponent, useState } from "react";
import { Todo } from "./Todo";
import { TodoDatePicker } from "./DatePicker";
import { Input } from "./../ui/Input";
import { Button, ButtonType } from "./../ui/Button";
import styled from "styled-components";

type AddTodoState = {
  title: string;
  startAt: Date;
};

type AddTodoProps = {
  onAdd: (title: string) => void;
};

export const AddTodo: FunctionComponent<AddTodoProps> = (props) => {
  const { onAdd } = props;
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    onAdd(value);

    e.preventDefault();
    setValue("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TodoHeaderLabel margin="0 0 20px">Add Item</TodoHeaderLabel>
        <TodoDatePicker />
        <Input
          width="318"
          display="inline"
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          id="new-task"
        />

        <Button color={ButtonType.Add} type="submit">
          Add
        </Button>
      </form>
    </>
  );
};

type TodoHeaderLabelStyle = {
  margin: string;
};

const TodoHeaderLabel = styled("label")<TodoHeaderLabelStyle>`
  color: #333;
  font-weight: 700;
  font-size: 15px;
  border-bottom: 2px solid #333;
  padding: 30px 0 10px;
  text-transform: uppercase;
  display: block;
  margin: ${(props) => props.margin};
`;
