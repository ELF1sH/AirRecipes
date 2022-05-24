import {configureStore, createSlice} from "@reduxjs/toolkit";
import recipesReducer from './recipesSlice'
import recipeDetailsReducer from './recipeDetailsSlice'


export const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        recipeDetails: recipeDetailsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})