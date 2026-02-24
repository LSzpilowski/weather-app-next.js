import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForecastCard from "../app/components/ForecastCard";

jest.mock("../app/components/FormattedDate", () => ({
  __esModule: true,
  default: ({ date }: { date: Date }) => <span>{date.toDateString()}</span>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority: _p, unoptimized: _u, ...props }: Record<string, unknown>) => <img {...props} />,
}));

const defaultProps = {
  date: new Date("2024-11-15"),
  icon: "https://example.com/icon.png",
  description: "Sunny",
  tempMax: 18,
  tempMin: 8,
  index: 0,
  isClicked: false,
  isDimmed: false,
  onClick: jest.fn(),
};

describe("ForecastCard", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders max and min temperatures", () => {
    render(<ForecastCard {...defaultProps} />);
    expect(screen.getByText("18°")).toBeInTheDocument();
    expect(screen.getByText("8°")).toBeInTheDocument();
  });

  it("renders icon with correct alt text", () => {
    render(<ForecastCard {...defaultProps} />);
    expect(screen.getByRole("img", { name: "Sunny" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn();
    render(<ForecastCard {...defaultProps} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has aria-pressed=false when not clicked", () => {
    render(<ForecastCard {...defaultProps} isClicked={false} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("has aria-pressed=true when clicked", () => {
    render(<ForecastCard {...defaultProps} isClicked={true} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("applies opacity-30 class when dimmed", () => {
    render(<ForecastCard {...defaultProps} isDimmed={true} />);
    expect(screen.getByRole("button")).toHaveClass("opacity-30");
  });

  it("applies opacity-100 class when not dimmed", () => {
    render(<ForecastCard {...defaultProps} isDimmed={false} />);
    expect(screen.getByRole("button")).toHaveClass("opacity-100");
  });

  it("is accessible via keyboard Enter", async () => {
    const onClick = jest.fn();
    render(<ForecastCard {...defaultProps} onClick={onClick} />);
    const button = screen.getByRole("button");
    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
