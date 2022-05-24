import styles from './BriefInfoPanel.module.scss'
import {ReactComponent as DifficultyIcon} from "../../../../icons/recipe-details-icons/difficultyIcon.svg";
import {ReactComponent as CaloriesIcon} from '../../../../icons/recipe-details-icons/caloriesIcon.svg'
import {ReactComponent as CuisineIcon} from '../../../../icons/recipe-details-icons/cuisineIcon.svg'
import {ReactComponent as TimeIcon} from '../../../../icons/recipe-details-icons/timeIcon.svg'
import colors from '../../../../scss__abstracts/_variables.scss'
import {useSelector} from "react-redux";

export const BriefInfoPanel = (props) => {
    const getCookTime = useSelector(state => state.recipeDetails.getCookTime)

    return (
        <div className={`${styles.brief_info} ${props.className}`}>
            <div className={styles.item}>
                <DifficultyIcon fill={colors[props.difficulty]} stroke={colors[props.difficulty]} className={styles.icon} />
                <p className={styles[props.difficulty]}>{props.difficulty}</p>
            </div>
            <div className={styles.item}>
                <TimeIcon className={styles.icon} />
                <p>{getCookTime(props.cookTime)}</p>
            </div>
            <div className={styles.item}>
                <CaloriesIcon className={styles.icon} />
                <p>{props.caloricity}</p>
            </div>
            <div className={styles.item}>
                <CuisineIcon className={styles.icon} />
                <p>{props.cuisineTitle}</p>
            </div>
        </div>
    )
}