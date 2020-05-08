import React, { FunctionComponent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TodoDatePicker: FunctionComponent = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Click to select a date"
      />
    </>
  );
};
