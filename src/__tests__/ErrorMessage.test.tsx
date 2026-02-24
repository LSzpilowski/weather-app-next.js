import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "../app/components/ErrorMessage";
import userEvent from "@testing-library/user-event";

describe("ErrorMessage", () => {
  it("renders error text", () => {
    render(<ErrorMessage error="City not found" onClear={jest.fn()} />);
    expect(screen.getByText("City not found")).toBeInTheDocument();
  });

  it("calls onClear when close button is clicked", async () => {
    const onClear = jest.fn();
    render(<ErrorMessage error="Some error" onClear={onClear} />);
    await userEvent.click(screen.getByRole("button", { name: /close error/i }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("has accessible close button label", () => {
    render(<ErrorMessage error="Error" onClear={jest.fn()} />);
    expect(screen.getByLabelText(/close error message/i)).toBeInTheDocument();
  });
});
