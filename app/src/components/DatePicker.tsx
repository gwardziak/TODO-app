import React, { FunctionComponent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "./../ui/Input";
import styled, { css } from "styled-components";
import { FaCalendarAlt } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import Inputmask from "inputmask";

export const TodoDatePicker: FunctionComponent = () => {
  const [date, setDate] = useState<Date | string | null | undefined>(
    new Date()
  );
  const [edit, setEdit] = useState<boolean>(false);

  const formatDate = (input: string) => {
    const transformInput = input
      .replace(/,/g, "")
      .replace(/[\s:]/g, "/")
      .split("/");
    const date = new Date(
      //@ts-ignore
      transformInput[2],
      //@ts-ignore
      transformInput[1] - 1,
      transformInput[0],
      transformInput[3],
      transformInput[4]
    );
    console.log(date);
    console.log(date);
    if (date.toString() === "Invalid Date") return "Invalid Date";

    return date;
  };

  Inputmask({
    alias: "datetime",
    placeholder: "dd/mm/yyyy, hh:mm",
    inputFormat: "dd/mm/yyyy, HH:MM",
    numericInput: false,
    clearMaskOnLostFocus: false,
    positionCaretOnClick: "none",
    clearIncomplete: true,
  }).mask("dateMask");

  return (
    <>
      <CalendarContainer>
        <StyledInput
          type="text"
          id="dateMask"
          //@ts-ignore
          value={date.toLocaleString()}
          onFocus={() => setEdit(true)}
          onChange={(e) => setDate(e.target.value)}
          onBlur={(e) => {
            //checkDate
            setDate(formatDate(e.target.value));
            setEdit(false);
          }}
        />
        <StyledCalendar>
          <DatePicker
            //@ts-ignore
            selected={edit ? null : date}
            onChange={(date) => setDate(date)}
            dateFormat="d/MM/yyyy, HH:mm"
            showTimeSelect
            timeFormat="HH:mm"
            customInput={
              <StyledIcon>
                <FaCalendarAlt fill="black" />
              </StyledIcon>
            }
          />
        </StyledCalendar>
        <StyledIcon>
          <GrPowerReset onClick={() => setDate(new Date())} />{" "}
        </StyledIcon>
      </CalendarContainer>
    </>
  );
};

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

const StyledIcon = styled("div")`
  display: inline;
  margin-left: 12px;
`;

const StyledInput = styled("input")`
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

const CalendarContainer = styled("div")`
  margin: 0;
  margin-left: 10px;
  width: 250px;
  display: inline;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  font-family: Lato, sans-serif;
`;
