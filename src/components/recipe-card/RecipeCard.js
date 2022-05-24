import styles from './RecipeCard.module.scss'
import {Card, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import useRipple from "use-ripple-hook";
import colors from "../../scss__abstracts/_variables.scss";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";

export const RecipeCard = (props) => {
    const [ripple, event] = useRipple({
        color: colors.shade20
    })
    const navigate = useNavigate()
    const recipe = props.recipe

    const getCookTime = useSelector(state => state.recipeDetails.getCookTime)

    const handleClick = () => {
        navigate(`/recipe/${recipe.id}`)
    }

    return (
        <Card sx={{ width: 348, height: 384 }} className={styles.card} ref={ripple} onMouseDown={event} onClick={handleClick}>
            <CardMedia
                draggable={false}
                component="img"
                height="196"
                image={recipe.thumbnail}
                alt=""
            />
            <div className={styles.chips_container}>
                <Chip label={getCookTime(recipe.cookTime)} className={styles.chip} />
                <Chip label={`${recipe.caloricity} kCal`} className={styles.chip} />
                <Chip label={recipe.cuisine.title} className={styles.chip} />
            </div>

            <CardContent className={styles.card_content}>
                <h3 className={styles.card_header}>{recipe.title}</h3>
                <p>{recipe.description.length < 50 ? recipe.description : `${recipe.description.substring(0, 147)}...`}</p>
            </CardContent>
        </Card>
    )
}