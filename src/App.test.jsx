import * as React from 'react';
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent, screen } from '@testing-library/react';
import { expect } from 'chai';
import App from './App';

describe('<App>', () => {
  const utils = render(<App />, { wrapper: MemoryRouter })
  const titleElement = utils.getByText(/Insured details & cover options/i)
  const input = utils.getByPlaceholderText('Full name')
  const nextButton = utils.getByRole('button', { name: /next/i })

  it('renders Stepper', () => {
    expect(document.body.contains(titleElement))
  })

  it('renders first input', () => {
    expect(document.body.contains(input))
  })

  it('next button should be disabled initially', () => {
    expect(nextButton.hasAttribute('disabled')).to.eq(true)
  })
})
