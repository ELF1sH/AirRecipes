import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchRecipeDetails} from "../../../store/recipeDetailsSlice";
import styles from './RecipeDetailsPage.module.scss'
import {ProgressCircle} from "../../default/ProgressCircle/ProgressCircle";
import {BriefInfoPanel} from "./brief-info-panel/BriefInfoPanel";
import {BulletedList} from "../../default/BulletedList/BulletedList";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import "swiper/css";
import "swiper/css/pagination";

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
                        <h2 className={styles.mb16}>{recipeDetails.title}</h2>
                        <p className={styles.mb16}>{recipeDetails.description}</p>
                        <BriefInfoPanel
                            difficulty={recipeDetails.difficulty}
                            cookTime={recipeDetails.cookTime}
                            caloricity={recipeDetails.caloricity}
                            cuisineTitle={recipeDetails.cuisine.title}
                            className={styles.mb24}
                        />
                        <BulletedList header={"Ingredients"} items={recipeDetails.ingredients} className={styles.mb32} />
                        <BulletedList header={"Instructions"} items={recipeDetails.instructions} countBullet className={styles.mb24} />
                    </div>
                    <div className={styles.flex_column}>
                        <Swiper pagination={true} modules={[Pagination]} className={styles.carousel}>
                            {
                                recipeDetails.images.map((item, idx) =>
                                    <SwiperSlide key={idx}><img src={item} alt="" style={{width: '100%'}} /></SwiperSlide>
                                )
                            }
                        </Swiper>
                    </div>
                </div>
            }
        </>
    )
}