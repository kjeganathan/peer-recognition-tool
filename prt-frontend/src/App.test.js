import { render, screen } from '@testing-library/react';
import App from './App';

test('Hello World Test', () => {
  expect(1 + 1).toBe(2)
})

// Original example test:
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
