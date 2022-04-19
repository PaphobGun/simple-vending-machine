// import React from 'react'

// interface UseAsyncReducerState<T> {
//   status: 'pending' | 'resolved' | 'rejected'
//   data: T | null
//   error: Error | null
// }

// enum UseAsyncActionType {
//   START,
//   RESOLVED,
//   REJECTED,
// }

// interface UseAsyncAction<T> {
//   type: UseAsyncActionType
//   data: T | null
//   error: Error | null
// }

// function useAsyncReducer<T>(
//   state: UseAsyncReducerState<T>,
//   action: UseAsyncAction<T>,
// ): UseAsyncReducerState<T> {
//   switch (action.type) {
//     case UseAsyncActionType.START:
//       return {
//         status: 'pending',
//         data: null,
//         error: null,
//       }
//     case UseAsyncActionType.RESOLVED:
//       return {
//         status: 'resolved',
//         data: action.data,
//         error: null,
//       }
//     case UseAsyncActionType.REJECTED:
//       return {
//         status: 'rejected',
//         data: null,
//         error: action.error,
//       }
//     default:
//       throw new Error(`Action type ${action.type} is not supported`)
//   }
// }

// function useAsync<T>() {
//   const [state, dispatch] = React.useReducer(useAsyncReducer, {
//     status: 'pending',
//     data: null,
//     error: null,
//   } as UseAsyncReducerState<T>)

//   React.useEffect(() => {

//   })
// }

// export default useAsync
