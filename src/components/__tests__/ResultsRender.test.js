import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Results from "../Results"

test("Test Results Render", async () => {
    render(<Results />);
    await waitFor(() => screen.findAllByRole("link"));
    const article = screen.findAllByRole("link");
    expect(article).toBeInTheDocument();
  })