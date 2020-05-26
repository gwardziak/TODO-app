import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { FaCalendarAlt } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import Inputmask from "inputmask";
import { DateType } from "./AddTodo";

type DatePickerProps = {
  date: DateType;

  setDate: (date: DateType) => void;
};

export const TodoDatePicker = (props: DatePickerProps) => {
  const leadingZero = (num: number) => `0${num}`.slice(-2);

  const formatDate = (date: Date) => {
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}, ${date.getHours()}:${leadingZero(
      date.getMinutes()
    )}`;
  };

  const { date, setDate } = props;
  const [input, setInput] = useState<string>(formatDate(date.startsAt));

  Inputmask({
    alias: "datetime",
    placeholder: "dd/mm/yyyy, hh:mm",
    inputFormat: "dd/mm/yyyy, HH:MM",
    numericInput: false,
    clearMaskOnLostFocus: false,
    positionCaretOnClick: "none",
  }).mask("dateMask");

  const serializeDate = (input: string) => {
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
      return { err: new Error("Invalid Date") };

    return { startsAt: date, err: null };
  };

  return (
    <>
      {date.err && <ErrorContainer>Invalid Date</ErrorContainer>}
      <CalendarContainer>
        <DateInput
          type="text"
          id="dateMask"
          value={input.toLocaleString()}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onBlur={(e) => {
            setDate({ ...date, ...serializeDate(input) });
          }}
        />
        <StyledCalendar>
          <DatePicker
            selected={date.startsAt}
            onChange={(pickedDate) => {
              setDate({
                err: null,
                startsAt: pickedDate ? pickedDate : date.startsAt,
              });
              setInput(formatDate(pickedDate ? pickedDate : date.startsAt));
            }}
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
            onClick={() => {
              const now = new Date();
              setDate({
                err: null,
                startsAt: now,
              });
              setInput(formatDate(now));
            }}
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
  margin-right: 15px;
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
