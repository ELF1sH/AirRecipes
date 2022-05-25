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
        initialRecipes: [],
        cuisines: [],
        status: 'pending',
        error: null,
        filterState: {
            calFilterMin: 100,
            calFilterMax: 1200,
            nameFilter: "",
            cuisineFilter: []
        }
    },
    reducers: {
        setNameFilter: (state, action) => { state.filterState.nameFilter = action.payload },
        applyFilter: (state) => {
            if (state.filterState.nameFilter) {
                state.recipes.recipes = state.initialRecipes.recipes.filter(x =>
                    x.title.toUpperCase().includes(state.filterState.nameFilter.toUpperCase())
                )
            }
            else {
                state.recipes = state.initialRecipes
            }
        }
    },
    extraReducers: {
        [fetchRecipes.pending]: (state, action) => {
            state.status = 'pending'
            state.error = null
        },
        [fetchRecipes.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.recipes = action.payload
            state.initialRecipes = state.recipes
            for (const recipe of action.payload.recipes) {
                if (state.cuisines.findIndex(x => x.id === recipe.cuisine.id) === -1) {
                    state.cuisines.push(recipe.cuisine)
                }
            }
            state.filterState.cuisineFilter = state.cuisines.map(item => {
                return {id: item.id, status: true}
            })
        },
        [fetchRecipes.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        }
    }
})

export const { setNameFilter, applyFilter } = recipesSlice.actions
export default recipesSlice.reducer