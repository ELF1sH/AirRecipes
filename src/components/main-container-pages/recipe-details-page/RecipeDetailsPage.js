import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchRecipeDetails} from "../../../store/recipeDetailsSlice";
import styles from './RecipeDetailsPage.module.scss'
import {ProgressCircle} from "../../default/ProgressCircle/ProgressCircle";
import caloriesIcon from '../../../icons/recipe-details-icons/caloriesIcon.svg'
import { ReactComponent as DifficultyIcon } from '../../../icons/recipe-details-icons/difficultyIcon.svg'
import cuisineIcon from '../../../icons/recipe-details-icons/cuisineIcon.svg'
import timeIcon from '../../../icons/recipe-details-icons/timeIcon.svg'

export const RecipeDetailsPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const recipeDetailsState = useSelector(state => state.recipeDetails)
    const recipeDetails = recipeDetailsState.recipeDetails
    console.log(recipeDetailsState)

    useEffect(() => {
        dispatch(fetchRecipeDetails({id: params.recipeId}))
    }, [])

    return (
        <>
            {recipeDetailsState.status === 'pending'
                ?
                <ProgressCircle />
                :
                <div className={styles.flex_container}>
                    <div className={styles.flex_column}>
                        <h2 className={styles.title}>{recipeDetails.title}</h2>
                        <p className={styles.description}>{recipeDetails.description}</p>
                        <div className={styles.brief_info}>
                            <div className={styles.item}>
                                <DifficultyIcon fill={"red"} stroke={"red"} className={styles.icon} />
                                <p>{recipeDetails.difficulty}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.flex_column}>

                    </div>
                </div>
            }
        </>
    )
}