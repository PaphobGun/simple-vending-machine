import '@testing-library/jest-dom'
import {renderHook, act} from '@testing-library/react'

import useAmountItem from 'hooks/amount-item'

let sampleItem = {
  id: 'test-id',
  value: 10,
}

afterEach(() => {
  sampleItem = {
    id: 'test-id',
    value: 10,
  }
})

test('exposes the items and can add new item into it', () => {
  const {result} = renderHook(useAmountItem)
  expect(result.current.items).toStrictEqual([])
  act(() => result.current.increment(sampleItem))
  expect(result.current.items).toContainEqual({...sampleItem, amount: 1})
})

test('exposes the items and can increment the amount in existing item', () => {
  // add new item
  const {result} = renderHook(useAmountItem)
  expect(result.current.items).toStrictEqual([])
  act(() => result.current.increment(sampleItem))
  expect(result.current.items).toContainEqual({...sampleItem, amount: 1})

  // increment existing item
  act(() => result.current.increment(sampleItem))
  expect(result.current.items).toContainEqual({...sampleItem, amount: 2})

  // ensure not add duplicate item
  expect(result.current.items).toHaveLength(1)
})

test('exposes the items and can decrement the amount in existing item', () => {
  // add new item
  const {result} = renderHook(useAmountItem)
  expect(result.current.items).toStrictEqual([])
  act(() => result.current.increment(sampleItem))
  expect(result.current.items).toContainEqual({...sampleItem, amount: 1})

  // increment existing item
  act(() => result.current.increment(sampleItem))
  expect(result.current.items).toContainEqual({...sampleItem, amount: 2})

  // decrement existing item
  act(() => result.current.decrement(sampleItem))
  expect(result.current.items).toContainEqual({...sampleItem, amount: 1})
})

test('exposes the items and can remove item when decrement the item hold amount of 1', () => {
  // add new item
  const {result} = renderHook(useAmountItem)
  expect(result.current.items).toStrictEqual([])
  act(() => result.current.increment(sampleItem))
  expect(result.current.items).toContainEqual({...sampleItem, amount: 1})

  // decrement existing item that have amount of 0 should remove the item
  act(() => result.current.decrement(sampleItem))
  expect(result.current.items).toStrictEqual([])
})
