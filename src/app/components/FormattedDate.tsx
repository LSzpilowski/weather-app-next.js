import { useEffect, useState } from "react";

interface IFormattedDateProps {
  date: Date;
  dayOnly: boolean;
}

export default function FormattedDate({ date, dayOnly = false }: IFormattedDateProps) {
  const [formatted, setFormatted] = useState("");
  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (dayOnly) {
      setFormatted(days[date.getDay()].substring(0, 3));
    } else {
      const dayFull = days[date.getDay()];
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      setFormatted(`${dayFull}, ${hours}:${minutes}`);
    }
  }, [date, dayOnly]);
  return <div>{formatted}</div>;
}
