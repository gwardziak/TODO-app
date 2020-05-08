import styled from "styled-components";

export enum ButtonType {
  Add = "#0FC57C",
  Delete = "#CF2323",
  Edit = "#333",
}

type Button = {
  color: ButtonType;
};

export const Button = styled("button")<Button>`
  outline: none;
  background: none;
  border: 0px;
  color: #888;
  font-size: 15px;
  width: 60px;
  margin: 10px 0 0;
  font-family: Lato, sans-serif;
  cursor: pointer;
      &:hover {
        color: ${(props) => props.color};
      }
  }`;
