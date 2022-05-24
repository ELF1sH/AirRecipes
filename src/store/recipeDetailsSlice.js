import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchRecipes} from "./recipesSlice";

export const fetchRecipeDetails = createAsyncThunk(
    'recipes/fetchRecipeDetails',     // redux toolkit names actions the same way
    async function({id: id}, {rejectWithValue}) {
        try {
            const response = await fetch(`https://test.kode-t.ru/detail_${id}.json`)
            if (!response.ok) {
                return Error("Server error")
            }
            return await response.json()
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const recipeDetailsSlice = createSlice({
    name: 'recipeDetails',
    initialState: {
        recipeDetails: {},
        status: 'pending',
        error: null,
        getCookTime: (seconds) => {
            if (seconds < 60) return `${seconds} sec`
            const minutes = seconds / 60
            if (minutes < 60) return `${minutes} min`
            const hours = minutes / 60
            return `${hours} hours`
        }
    },
    reducers: {},
    extraReducers: {
        [fetchRecipeDetails.pending]: (state, action) => {
            state.status = 'pending'
            state.error = null
        },
        [fetchRecipeDetails.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.recipeDetails = action.payload.recipe
        },
        [fetchRecipeDetails.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        }
    }
})

export default recipeDetailsSlice.reducer