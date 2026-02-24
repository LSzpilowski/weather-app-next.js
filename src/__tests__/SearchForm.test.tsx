import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "../app/components/SearchForm";

const defaultProps = {
  searchCity: jest.fn((e: React.FormEvent) => e.preventDefault()),
  updateCity: jest.fn(),
  clearCity: jest.fn(),
  showLocation: jest.fn(),
  cityInput: "",
  isSearching: false,
  isGeolocating: false,
  cityName: "Warsaw",
  isPinned: false,
  pinDisabled: false,
  maxPins: 6,
  onPinToggle: jest.fn(),
};

describe("SearchForm", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders search input", () => {
    render(<SearchForm {...defaultProps} />);
    expect(screen.getByRole("textbox", { name: /city name/i })).toBeInTheDocument();
  });

  it("input has correct id and name attributes", () => {
    render(<SearchForm {...defaultProps} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "city-search");
    expect(input).toHaveAttribute("name", "city");
  });

  it("input is controlled with cityInput value", () => {
    render(<SearchForm {...defaultProps} cityInput="Warsaw" />);
    expect(screen.getByRole("textbox")).toHaveValue("Warsaw");
  });

  it("calls updateCity on input change", async () => {
    const updateCity = jest.fn();
    render(<SearchForm {...defaultProps} updateCity={updateCity} />);
    await userEvent.type(screen.getByRole("textbox"), "P");
    expect(updateCity).toHaveBeenCalled();
  });

  it("shows clear button when cityInput has text and calls clearCity on click", async () => {
    const clearCity = jest.fn();
    render(<SearchForm {...defaultProps} cityInput="Berlin" clearCity={clearCity} />);
    const clearBtn = screen.getByRole("button", { name: /clear search/i });
    expect(clearBtn).toBeInTheDocument();
    await userEvent.click(clearBtn);
    expect(clearCity).toHaveBeenCalledTimes(1);
  });

  it("does not show clear button when cityInput is empty", () => {
    render(<SearchForm {...defaultProps} cityInput="" />);
    expect(screen.queryByRole("button", { name: /clear search/i })).not.toBeInTheDocument();
  });

  it("calls searchCity on form submit", async () => {
    const searchCity = jest.fn((e: React.FormEvent) => e.preventDefault());
    render(<SearchForm {...defaultProps} searchCity={searchCity} />);
    await userEvent.click(screen.getByRole("button", { name: /search for city/i }));
    expect(searchCity).toHaveBeenCalledTimes(1);
  });

  it("shows Searching... text and disables Search button when isSearching", () => {
    render(<SearchForm {...defaultProps} isSearching={true} />);
    expect(screen.getByRole("button", { name: /search for city/i })).toBeDisabled();
    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });

  it("shows Locating... and disables My location button when isGeolocating", () => {
    render(<SearchForm {...defaultProps} isGeolocating={true} />);
    expect(screen.getByRole("button", { name: /use my location/i })).toBeDisabled();
    expect(screen.getByText("Locating...")).toBeInTheDocument();
  });

  it("calls showLocation when My location button is clicked", async () => {
    const showLocation = jest.fn();
    render(<SearchForm {...defaultProps} showLocation={showLocation} />);
    await userEvent.click(screen.getByRole("button", { name: /use my location/i }));
    expect(showLocation).toHaveBeenCalledTimes(1);
  });
});
