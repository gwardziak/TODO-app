import React, { FunctionComponent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { FaCalendarAlt } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import Inputmask from "inputmask";

type dateOptions = {
  value: Date | string | null;
  isDate: boolean;
  error: string;
};

export const TodoDatePicker: FunctionComponent = () => {
  const [date, setDate] = useState<dateOptions>({
    value: new Date(),
    isDate: true,
    error: "",
  });

  Inputmask({
    alias: "datetime",
    placeholder: "dd/mm/yyyy, hh:mm",
    inputFormat: "dd/mm/yyyy, HH:MM",
    numericInput: false,
    clearMaskOnLostFocus: false,
    positionCaretOnClick: "none",
    //clearIncomplete: true,
  }).mask("dateMask");

  const serializeDate = (input: string): dateOptions => {
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
        value: input,
        isDate: false,
        error: "Invalid Date",
      };

    return { value: date, isDate: true, error: "" };
  };

  return (
    <>
      {date.error !== "" && <ErrorContainer>Invalid Date</ErrorContainer>}
      <CalendarContainer>
        <DateInput
          type="text"
          id="dateMask"
          value={date.value ? date.value.toLocaleString() : ""}
          onChange={(e) =>
            setDate({
              isDate: false,
              error: "",
              value: e.target.value,
            })
          }
          onBlur={(e) => {
            setDate(serializeDate(e.target.value));
          }}
        />
        <StyledCalendar>
          <DatePicker
            //@ts-ignore
            selected={date.isDate ? date.value : null}
            onChange={(date) =>
              setDate({
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
              setDate({
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
