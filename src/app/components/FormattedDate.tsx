import React from "react";

interface IFormattedDateProps {
  date: Date;
  dayOnly: boolean;
}

export default function FormattedDate({
  date,
  dayOnly = false,
}: IFormattedDateProps) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayCut = days[date.getDay()].substring(0, 3);

  if (dayOnly) {
    return <div>{dayCut}</div>;
  }

  const dayFull = days[date.getDay()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return (
    <div>
      {dayFull}, {hours}:{minutes}
    </div>
  );
}
