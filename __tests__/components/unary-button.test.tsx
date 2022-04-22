import * as React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import UnaryButton from 'components/unary-button'

test('click the unary button should call onClick properly', async () => {
  let counter = 0
  const handleOnClick = jest.fn(() => (counter += 1))

  const {rerender} = render(
    <UnaryButton click={handleOnClick}>{counter}</UnaryButton>,
  )

  const button = screen.getByTestId('unary-button')

  expect(button).toHaveTextContent(counter.toString())
  await userEvent.click(button)

  expect(handleOnClick).toHaveBeenCalledTimes(1)

  rerender(<UnaryButton click={handleOnClick}>{counter}</UnaryButton>)
  expect(button).toHaveTextContent(counter.toString())
})

test('unary should be disabled as if the prop `disabled` is true', async () => {
  const handleOnClick = jest.fn()

  render(
    <UnaryButton click={handleOnClick} disabled>
      0
    </UnaryButton>,
  )

  const button = screen.getByTestId('unary-button')

  expect(button).toBeDisabled()
})
