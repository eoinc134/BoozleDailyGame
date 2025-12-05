import { render, screen } from "@testing-library/react";
import { expect, test } from 'vitest';

import Header from "./Header";

test("renders BOOZLE title", () => {
  render(<Header />);
  const title = screen.getByText(/BOOZLE/i);
  expect(title).toBeTruthy()
});
