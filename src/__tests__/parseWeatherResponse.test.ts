import { parseWeatherResponse } from "../app/hooks/useWeather";

const mockApiResponse = {
  city: "Wrocław",
  daily: [
    {
      time: 1700000000,
      temperature: { day: 12.7, minimum: 8, maximum: 17, humidity: 72 },
      condition: { icon_url: "https://example.com/icon0.png", description: "Cloudy" },
      wind: { speed: 15.3 },
    },
    {
      time: 1700086400,
      temperature: { day: 10, minimum: 6, maximum: 14, humidity: 65 },
      condition: { icon_url: "https://example.com/icon1.png", description: "Sunny" },
      wind: { speed: 10 },
    },
    {
      time: 1700172800,
      temperature: { day: 9, minimum: 5, maximum: 13, humidity: 60 },
      condition: { icon_url: "https://example.com/icon2.png", description: "Rainy" },
      wind: { speed: 20 },
    },
    {
      time: 1700259200,
      temperature: { day: 11, minimum: 7, maximum: 15, humidity: 70 },
      condition: { icon_url: "https://example.com/icon3.png", description: "Windy" },
      wind: { speed: 25 },
    },
    {
      time: 1700345600,
      temperature: { day: 13, minimum: 9, maximum: 18, humidity: 68 },
      condition: { icon_url: "https://example.com/icon4.png", description: "Clear" },
      wind: { speed: 8 },
    },
    {
      time: 1700432000,
      temperature: { day: 14, minimum: 10, maximum: 19, humidity: 55 },
      condition: { icon_url: "https://example.com/icon5.png", description: "Partly cloudy" },
      wind: { speed: 12 },
    },
  ],
};

describe("parseWeatherResponse", () => {
  it("returns correct city name", () => {
    const result = parseWeatherResponse(mockApiResponse);
    expect(result.city).toBe("Wrocław");
  });

  it("rounds temperature correctly", () => {
    const result = parseWeatherResponse(mockApiResponse);
    expect(result.temperature).toBe(13); // Math.round(12.7)
  });

  it("sets ready to true", () => {
    const result = parseWeatherResponse(mockApiResponse);
    expect(result.ready).toBe(true);
  });

  it("sets icon from day[0]", () => {
    const result = parseWeatherResponse(mockApiResponse);
    expect(result.icon).toBe("https://example.com/icon0.png");
  });

  it("rounds wind speed", () => {
    const result = parseWeatherResponse(mockApiResponse);
    expect(result.wind).toBe(15); // Math.round(15.3)
  });

  it("converts timestamp to Date for today", () => {
    const result = parseWeatherResponse(mockApiResponse);
    expect(result.date).toBeInstanceOf(Date);
    expect(result.date.getTime()).toBe(1700000000 * 1000);
  });

  it("parses exactly 5 forecast days", () => {
    const result = parseWeatherResponse(mockApiResponse);
    expect(result.daily).toHaveLength(5);
  });

  it("maps forecast day properties correctly", () => {
    const result = parseWeatherResponse(mockApiResponse);
    const day1 = result.daily[0];
    expect(day1.tempMin).toBe(6);
    expect(day1.tempMax).toBe(14);
    expect(day1.icon).toBe("https://example.com/icon1.png");
    expect(day1.description).toBe("Sunny");
    expect(day1.humidity).toBe(65);
    expect(day1.wind).toBe(10);
    expect(day1.date).toBeInstanceOf(Date);
  });

  it("rounds all forecast temperatures", () => {
    const result = parseWeatherResponse(mockApiResponse);
    result.daily.forEach((day) => {
      expect(Number.isInteger(day.tempMin)).toBe(true);
      expect(Number.isInteger(day.tempMax)).toBe(true);
      expect(Number.isInteger(day.wind)).toBe(true);
    });
  });

  it("throws when daily array has fewer than 6 entries", () => {
    const badResponse = { city: "Test", daily: mockApiResponse.daily.slice(0, 4) };
    expect(() => parseWeatherResponse(badResponse)).toThrow("Invalid weather data received");
  });

  it("throws when daily is undefined", () => {
    const badResponse = { city: "Test", daily: undefined as unknown as typeof mockApiResponse.daily };
    expect(() => parseWeatherResponse(badResponse)).toThrow("Invalid weather data received");
  });
});
