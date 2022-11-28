import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./pokemonSlice";

export default configureStore({
  reducer: rootReducer,
});
