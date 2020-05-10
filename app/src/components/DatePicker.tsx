import React, { FunctionComponent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "./../ui/Input";

export const TodoDatePicker: FunctionComponent = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="d MMMM yyyy, h:mm aa"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        customInput={<Input width="250" display="block" />}
      />
    </>
  );
};
