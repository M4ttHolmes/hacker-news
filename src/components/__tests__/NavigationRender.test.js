import React from 'react';
import { render, screen } from '@testing-library/react';
import Navigation from "../Navigation"

// Test Block

// 1 - Render a component to test
// 2 - Find elements we want to interact with
// 3 - Interact with those elements
// 4 - Assert that the results are as expected

test("Test Navigation Render", () => {
  render(<Navigation />);
  const logo = screen.getByRole("img");
  const newestLink = screen.getByText(/Newest/i);
  const pastLink = screen.getByText(/Past/i);
  const commentsLink = screen.getByText(/Comments/i);
  const askLink = screen.getByText(/Ask/i);
  const showLink = screen.getByText(/Show/i);
  const jobsLink = screen.getByText(/Jobs/i);
  const searchInput = screen.getByRole("searchbox");
  const searchButton = screen.getByTestId("searchButton")
  expect(logo).toBeInTheDocument();
  expect(newestLink).toBeInTheDocument();
  expect(pastLink).toBeInTheDocument();
  expect(commentsLink).toBeInTheDocument();
  expect(askLink).toBeInTheDocument();
  expect(showLink).toBeInTheDocument();
  expect(jobsLink).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
})