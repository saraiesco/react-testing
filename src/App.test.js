/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, queryByText , getByText} from '@testing-library/react';
import { App } from './App';

/**
 * Verify something should render
 */
test('App should render', () => {
  render(<App />);

  expect(screen.getByText('Welcome, party people!')).toBeInTheDocument();
});

test('Button should render', () => {
    const { getByText } = render(<App />);

    const button = getByText(/Current theme: light/i);
  
    expect(button).toBeInTheDocument();
});

/**
 * Verify clicking button should change theme
 * hint: use fireEvent.click(element) to trigger a click event on an element
 */
test('theme button should update button text', async () => {
  const { getByText, rerender } = render(<App />);
  const button = getByText(/Current theme: light/i);
  fireEvent.click(button);
  rerender(<App />);
  const updatedThemeText = getByText(/Current theme: dark/i);
  expect(updatedThemeText.textContent).toBe('Current theme: dark');
});

// BONUS
// hint: there is a `.toHaveStyle` method.
// e.g.: expect(element).toHaveStyle('color: #FFF');
test('theme button should toggle styles', () => {
  // TODO: change the expect to actually test something 😉
  const { getByText} = render(<App />);
  const button = getByText(/Current theme: light/i);
  const {body} = document;
  fireEvent.click(button);
  expect(body).toHaveStyle('color: rgb(255,255,255)');
});

/**
 * Verify clicking button should toggle hidden content
 *
 * hint: you can check if something does not exist by using .not
 * e.g. expect(element).not.toBeInTheDocument()
 *
 * hint: use `queryByText` instead of `getByText` to check if something is _not_ rendered
 * (getByText will throw an error if it is not rendered)
 */
test('hidden button should toggle hidden content', () => {
  // TODO: change the expect to actually test something 😉
  // const { queryByText, getByText, rerender } = render(<App />);
  // const hiddenText= queryByText(/this content is hidden by default/i)
  // expect(hiddenText).not.toBeInTheDocument()
  // const button = getByText(/Show hidden content/i);
  // fireEvent.click(button);
  // rerender(<App />);
  // expect(hiddenText).toBeInTheDocument()
  render (<App/>)
  const button = screen.getByText ("Show hidden content")
  fireEvent.click(button)
  let hiddenText= screen.getByText("this content is hidden by default")
  expect(hiddenText).toBeInTheDocument()
  fireEvent.click(button)
     hiddenText= screen.queryByText("this content is hidden by default")
      expect(hiddenText).not.toBeInTheDocument()

});


/**
 * Want more? Try these:
 *   - check for the presence of a specific element, like the paragraph containing the text "Click the button to toggle the theme"
 *   - check the for the class name .container on the surrounding div
 *   - after clicking the toggle hidden content button, check for the button text to update to "hide" instead of "show"
 */
