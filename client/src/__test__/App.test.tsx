import React from "react";
import { render, screen } from "@testing-library/react";

import App from "../App";

describe("<App />", () => {
  test("should display Main page! header", () => {
    render(<App />);
    expect(screen.getByText("Main page!")).toBeInTheDocument();
  });
});
