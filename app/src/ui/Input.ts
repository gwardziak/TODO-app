import styled from "styled-components";

type InputType = {
  width: string;
  display: string;
};

export const Input = styled("input")<InputType>`
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 18px;
  height: 18px;
  line-height: 18px;
  background: #fff;
  border-radius: 6px;
  font-family: Lato, sans-serif;
  color: #888;
  margin: 0;
  margin-left: 10px;

  display: ${(props) => props.display};
  width: ${(props) => props.width}px;
`;
