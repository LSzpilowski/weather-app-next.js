import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority: _p, unoptimized: _u, ...props }: Record<string, unknown>) => <img {...props} />,
}));

import CurrentWeather from "../app/components/CurrentWeather";

const baseDate = new Date("2024-11-15T14:30:00");

const defaultProps = {
  city: "Wrocław",
  date: baseDate,
  temperature: 12,
  icon: "https://example.com/icon.png",
  description: "Cloudy",
};

describe("CurrentWeather", () => {
  it("renders city name", () => {
    render(<CurrentWeather {...defaultProps} />);
    expect(screen.getByText("Wrocław")).toBeInTheDocument();
  });

  it("renders temperature with degree symbol", () => {
    render(<CurrentWeather {...defaultProps} />);
    expect(screen.getByText("12°")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<CurrentWeather {...defaultProps} />);
    expect(screen.getByText("Cloudy")).toBeInTheDocument();
  });

  it("renders weather icon with correct alt text", () => {
    render(<CurrentWeather {...defaultProps} />);
    expect(screen.getByRole("img", { name: /cloudy weather icon/i })).toBeInTheDocument();
  });

  it("renders current day of week (not from date prop)", () => {
    render(<CurrentWeather {...defaultProps} />);
    const now = new Date();
    const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
    expect(screen.getByText(new RegExp(dayName, "i"))).toBeInTheDocument();
  });

  it("renders current live time (not from date prop)", () => {
    render(<CurrentWeather {...defaultProps} />);
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    expect(screen.getByText(new RegExp(`${hours}:${minutes}`))).toBeInTheDocument();
  });
});
