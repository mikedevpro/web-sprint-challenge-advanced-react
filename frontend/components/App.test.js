import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppClass from './AppClass';
import AppFunctional from './AppFunctional';
// Write your tests here
test('sanity', () => {
  expect(false).toBe(false)
})

test('renders coordinates and steps', async () => {
  render(<AppClass />);

  const coordinatesElement = screen.getByText(/Coordinates/);
  const stepsElement = screen.getByText(/You moved/);

  expect(coordinatesElement).toBeInTheDocument();
  expect(stepsElement).toBeInTheDocument();
});

test('reset button clears messages', async () => {
  render(<AppClass />);

  const resetButton = screen.getByText('reset');
  fireEvent.click(resetButton);

  const responseElement = screen.queryByText(/You can't go/);
  expect(responseElement).not.toBeInTheDocument();
});

test('App Class Renders', () => {
  render(<AppFunctional />)
})
test('Nav links are present', () => {
  render(<AppFunctional />)
  const nav = screen.queryAllByRole('nav')
  expect(nav).toBeTruthy()
})
test('Coordinates are present', () => {
  render(<AppFunctional />)
  const header = screen.queryByText(/Coordinates/i)
  expect(header).toBeTruthy()
})
test('Buttons are present', () => {
  render(<AppFunctional />)
  const buttons = screen.queryAllByRole('button')
  expect(buttons).toHaveLength(6)
})
test('Movement is present', () => {
  render(<AppFunctional />)
  const movement = screen.queryByText(/You moved/i)
  expect(movement).toBeTruthy()
})

test('email imput field is present', () => {
  render(<AppClass />);
  const emailInput = screen.getByPlaceholderText('type email');
  expect(emailInput).toBeInTheDocument();
});