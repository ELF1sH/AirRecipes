import styles from './MainContainer.module.scss'
import {RecipesPage} from "../main-container-pages/recipes-page/RecipesPage";
import { Routes, Route } from "react-router-dom";
import {RecipeDetailsPage} from "../main-container-pages/recipe-details-page/RecipeDetailsPage";

export const MainContainer = () => {
    return (
        <div className={styles.main_wrapper}>
            <Routes>
                <Route path="/" element={<RecipesPage />} />
                <Route path="recipe/:recipeId" element={<RecipeDetailsPage />} />
            </Routes>
        </div>
    )
}