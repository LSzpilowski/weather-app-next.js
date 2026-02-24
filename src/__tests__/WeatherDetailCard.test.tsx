import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherDetailCard from "../app/components/WeatherDetailCard";

describe("WeatherDetailCard", () => {
  it("renders label and value", () => {
    render(<WeatherDetailCard iconType="humidity" label="Humidity" value="72%" bgColor="bg-blue-500/20" />);
    expect(screen.getByText("Humidity")).toBeInTheDocument();
    expect(screen.getByText("72%")).toBeInTheDocument();
  });

  it("renders SVG icon for humidity", () => {
    const { container } = render(
      <WeatherDetailCard iconType="humidity" label="Humidity" value="72%" bgColor="bg-blue-500/20" />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders SVG icon for wind", () => {
    const { container } = render(
      <WeatherDetailCard iconType="wind" label="Wind" value="15 km/h" bgColor="bg-emerald-500/20" />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders SVG icon for tempMin", () => {
    const { container } = render(
      <WeatherDetailCard iconType="tempMin" label="Min Temp" value="5°" bgColor="bg-cyan-500/20" />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders SVG icon for tempMax", () => {
    const { container } = render(
      <WeatherDetailCard iconType="tempMax" label="Max Temp" value="20°" bgColor="bg-orange-500/20" />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies custom bgColor class", () => {
    const { container } = render(
      <WeatherDetailCard iconType="humidity" label="Humidity" value="50%" bgColor="bg-pink-500/20" />
    );
    expect(container.querySelector(".bg-pink-500\\/20")).toBeInTheDocument();
  });
});
