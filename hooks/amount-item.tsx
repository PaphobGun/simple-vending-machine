import React from 'react'

interface Item {
  id: string
  amount: number
  value: number
}

interface AmountItemReducerState<T extends Item> {
  items: T[]
  totalValue: number
}

enum ActionType {
  ADD,
  REMOVE,
  INCREMENT,
  DECREMENT,
}

interface AddAction {
  type: ActionType.ADD
  item: {
    id: string
    value: number
  }
}

interface RemoveAction {
  type: ActionType.REMOVE
  item: {
    id: string
  }
}

interface IncrementAction {
  type: ActionType.INCREMENT
  item: {
    id: string
    value: number
  }
}

interface DecrementAction {
  type: ActionType.DECREMENT
  item: {
    id: string
    value: number
  }
}

type Action = AddAction | RemoveAction | IncrementAction | DecrementAction

function amountItemReducer<T extends Item>(
  state: AmountItemReducerState<T>,
  action: Action,
) {
  switch (action.type) {
    case ActionType.INCREMENT:
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.item.id ? {...i, amount: i.amount + 1} : i,
        ),
        totalValue: state.totalValue + action.item.value,
      }
    case ActionType.DECREMENT:
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.item.id ? {...i, amount: i.amount - 1} : i,
        ),
        totalValue: state.totalValue - action.item.value,
      }
    case ActionType.ADD:
      return {
        ...state,
        items: [...state.items, {...action.item, amount: 1}],
        totalValue: state.totalValue + action.item.value,
      }
    case ActionType.REMOVE:
      const target = state.items.find(i => i.id === action.item.id)
      if (!target) {
        throw new Error('Invalid item id')
      }
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.item.id),
        totalValue: state.totalValue - target.amount * target.value,
      }
    default:
      throw new Error('action type is not support')
  }
}

export default function useAmountItem() {
  const [state, dispatch] = React.useReducer(amountItemReducer, {
    items: [],
    totalValue: 0,
  })

  const increment = (item: {id: string; value: number}) => {
    const existingItem = state.items.find(i => i.id === item.id)
    if (existingItem) {
      dispatch({type: ActionType.INCREMENT, item})
    } else {
      dispatch({
        type: ActionType.ADD,
        item,
      })
    }
  }

  const decrement = (item: {id: string; value: number}) => {
    const existingItem = state.items.find(i => i.id === item.id)
    if (existingItem?.amount === 1) {
      dispatch({type: ActionType.REMOVE, item})
    } else {
      dispatch({type: ActionType.DECREMENT, item})
    }
  }

  const getItemAmount = React.useCallback(
    (id: string) => {
      const item = state.items.find(i => i.id === id)

      if (item) {
        return item.amount
      }

      return 0
    },
    [state.items],
  )

  return {...state, increment, decrement, getItemAmount}
}
