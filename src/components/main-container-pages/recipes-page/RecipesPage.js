import styles from './RecipesPage.module.scss'
import {RecipeCard} from "../../recipe-card/RecipeCard";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {applyFilter, fetchRecipes} from "../../../store/recipesSlice";
import {ProgressCircle} from "../../default/ProgressCircle/ProgressCircle";

export const RecipesPage = () => {
    const dispatch = useDispatch()
    const recipesState = useSelector(state => state.recipes)

    useEffect(() => {
        if (!recipesState.recipes.recipes) {
            dispatch(fetchRecipes())
            dispatch(applyFilter())
        }
    }, [])

    return (
        <>
        {recipesState.status === 'pending'
            ?
                <ProgressCircle />
            :
            <div className={styles.grid_wrapper}>
                {recipesState.recipes.recipes.map(recipe =>
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                    />
                )}
            </div>
        }
        </>
    )
}