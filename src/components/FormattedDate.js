import React from "react";

export default function FormattedDate({ date, dayOnly = false }) {
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

  let dayFull = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return (
    <div>
      {dayFull}, {hours}:{minutes}
    </div>
  );
}
