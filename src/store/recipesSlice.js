import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',     // redux toolkit names actions the same way
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('https://test.kode-t.ru/list.json')
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

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        cuisines: [],
        status: 'pending',
        error: null
    },
    reducers: {},
    extraReducers: {
        [fetchRecipes.pending]: (state, action) => {
            state.status = 'pending'
            state.error = null
        },
        [fetchRecipes.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.recipes = action.payload
            for (const recipe of action.payload.recipes) {
                if (state.cuisines.findIndex(x => x.id === recipe.cuisine.id) === -1) {
                    state.cuisines.push(recipe.cuisine)
                }
            }
        },
        [fetchRecipes.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        }
    }
})

export default recipesSlice.reducer