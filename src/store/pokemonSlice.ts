import { createSlice } from '@reduxjs/toolkit'

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: <any[]>[],
  },
  reducers: {
    replacePokemons: (state, action) => {
      state.pokemons = action.payload
    },
  },
})

export const { replacePokemons } = pokemonSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const replacePokemonAsync = (pokemons: any) => (dispatch: any) => {
  setTimeout(() => {
    dispatch(replacePokemons(pokemons))
  }, 1000)
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state: { pokemons: { pokemons: any[] } }) => {
  console.debug({state})
  return state?.pokemons?.pokemons?.length || 0
}

export default pokemonSlice.reducer


// import { UPDATE_POKEMONS } from "./constants";

// export const initialState = {
//   pokemons: <any[]>[],
// };

// // Use the initialState as a default value
// export default function appReducer(state = initialState, action: {type: string, payload?: any}) {
//   // The reducer normally looks at the action type field to decide what happens
//   switch (action.type) {
//     // Do something here based on the different types of actions
//     case UPDATE_POKEMONS:

//     default:
//       // If this reducer doesn't recognize the action type, or doesn't
//       // care about this specific action, return the existing state unchanged
//       return state;
//   }
// }


