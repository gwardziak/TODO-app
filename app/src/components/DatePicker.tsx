import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { FaCalendarAlt } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import Inputmask from "inputmask";

type DatePickerProps = {
  date: {
    value: Date | string | null;
    isDate: boolean;
    error: string;
  };

  setTodo: (propertka: any) => void;
};

export const TodoDatePicker = (props: DatePickerProps) => {
  const {
    date: { value, isDate, error },
    setTodo,
  } = props;

  Inputmask({
    alias: "datetime",
    placeholder: "dd/mm/yyyy, hh:mm",
    inputFormat: "dd/mm/yyyy, HH:MM",
    numericInput: false,
    clearMaskOnLostFocus: false,
    positionCaretOnClick: "none",
    //clearIncomplete: true,
  }).mask("dateMask");

  const serializeDate = (input: string): Omit<DatePickerProps, "setTodo"> => {
    const transformInput: number[] = input
      .replace(/,/g, "")
      .replace(/[\s:]/g, "/")
      .split("/")
      .map(Number);

    const date = new Date(
      transformInput[2],
      transformInput[1] - 1,
      transformInput[0],
      transformInput[3],
      transformInput[4]
    );

    if (date.toString() === "Invalid Date")
      return {
        //@ts-ignore
        value: input,
        isDate: false,
        error: "Invalid Date",
      };
    //@ts-ignore
    return { value: date, isDate: true, error: "" };
  };

  return (
    <>
      {error !== "" && <ErrorContainer>Invalid Date</ErrorContainer>}
      <CalendarContainer>
        <DateInput
          type="text"
          id="dateMask"
          value={value ? value.toLocaleString() : ""}
          onChange={(e) =>
            setTodo({
              isDate: false,
              error: "",
              value: e.target.value,
            })
          }
          onBlur={(e) => {
            setTodo(serializeDate(e.target.value));
          }}
        />
        <StyledCalendar>
          <DatePicker
            //@ts-ignore
            selected={isDate ? value : null}
            onChange={(date) =>
              setTodo({
                isDate: true,
                error: "",
                value: date,
              })
            }
            dateFormat="dd/MM/yyyy, HH:mm"
            showTimeSelect
            timeFormat="HH:mm"
            customInput={
              <Icon>
                <FaCalendarAlt fill="black" />
              </Icon>
            }
          />
        </StyledCalendar>
        <Icon>
          <GrPowerReset
            onClick={() =>
              setTodo({
                isDate: true,
                error: "",
                value: new Date(),
              })
            }
          />
        </Icon>
      </CalendarContainer>
    </>
  );
};

const CalendarContainer = styled("div")`
  margin: 0;
  margin-left: 10px;
  width: 250px;
  display: inline;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10.2px;
  font-family: Lato, sans-serif;
`;

const DateInput = styled("input")`
  border: 0;
  outline: none;
  width: 160px;
  font-size: 18px;
  height: 18px;
  line-height: 18px;
  background: #fff;
  font-family: Lato, sans-serif;
  color: #888;
  margin: 0;
`;

const Icon = styled("div")`
  display: inline;
  margin-left: 12px;
`;

const ErrorContainer = styled("div")`
  display: block;
  margin: 0;
  margin-top: -15px;
  margin-left: 80px;
  color: red;
  margin-bottom: 5px;
`;

const StyledCalendar = styled("div")`
  display: inline-block;
  .react-datepicker {
    margin-left: -30px;
  }
  .react-datepicker__tab-loop {
    display: inline-block;
  }
  .react-datepicker__navigation {
    right: 90px;
  }
`;
