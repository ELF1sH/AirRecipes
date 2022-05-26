import styles from './FilterForm.module.scss'
import {Modal} from "../default/Modal/Modal";
import {Button, Checkbox, Divider, FormControlLabel} from "@mui/material";
import colors from '../../scss__abstracts/_variables.scss'
import {useDispatch, useSelector} from "react-redux";
import {Slider} from "../default/Slider/Slider";
import {useRef} from "react";
import {setCuisineFilter, setCalFilter,
    clearFilter, applyFilter, resetCurFilterStateToFilterState,
    CAL_SLIDER_MIN_VALUE, CAL_SLIDER_MAX_VALUE
} from "../../store/recipesSlice";

export const FilterForm = (props) => {
    const recipes = useSelector(state => state.recipes)
    const dispatch = useDispatch()

    const checkboxOnChange = (id) => {
        const prev = recipes.curFilterState.cuisineFilter.map(item => Object.assign({}, item))
        prev.find(x => x.id === id).status = !prev.find(x => x.id === id).status
        dispatch(setCuisineFilter(prev))
    }

    const sliderRef = useRef()
    const sliderOnChange = () => {
        dispatch(setCalFilter(sliderRef.current.getState()))
    }

    const btnApplyOnClick = () => {
        dispatch(applyFilter())
        props.setIsModalOpened(false)
    }

    const isFilterChanged = () => {
        if (recipes.curFilterState.calFilter[0] !== CAL_SLIDER_MIN_VALUE) return true;
        if (recipes.curFilterState.calFilter[1] !== CAL_SLIDER_MAX_VALUE) return true;
        for (const item of recipes.curFilterState.cuisineFilter) {
            if (item.status === false) return true;
        }
        return false;
    }

    const handleClose = () => {
        props.setIsModalOpened(false)
        dispatch(resetCurFilterStateToFilterState())  // cause curFilter wasn't applied. That's why we need to reset it
    }

    return (
        <Modal isOpen={props.isModalOpened} handleClose={handleClose}>
            <div className={styles.modal_wrapper}>
                <h3>Filter</h3>
                {recipes.cuisines.map(item =>
                    <div key={item.id}>
                        <div className={styles.cuisine_checkbox_wrapper}>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={
                                        recipes.curFilterState.cuisineFilter.length ? recipes.curFilterState.cuisineFilter.find(x => x.id === item.id).status : true
                                    }
                                    sx={{color: colors.shade50, '&.Mui-checked': {color: colors.shade50}}} onChange={() => checkboxOnChange(item.id)}
                                />
                            } label={item.title} labelPlacement={"start"} />
                        </div>
                        <Divider />
                    </div>
                )}

                <Slider
                    minDistance={50} value={recipes.curFilterState.calFilter} ref={sliderRef} onChange={sliderOnChange}
                    min={CAL_SLIDER_MIN_VALUE} max={CAL_SLIDER_MAX_VALUE} className={styles.slider}
                />
                <p className={styles.p}>Calories, kCal</p>

                <div className={styles.button_row}>
                    {
                        isFilterChanged() ?
                            <Button variant="outlined" onClick={() => dispatch(clearFilter())} sx={{
                                borderColor: colors.shade50,
                                color: colors.shade50,
                                '&:hover': { borderColor: colors.shade50 },
                                float: 'left'
                            }}>Clear</Button>
                        : null
                    }
                    <Button variant="contained" onClick={btnApplyOnClick} sx={{
                        bgcolor: colors.shade50,
                        '&:hover': { bgcolor: '#746B5F' },
                        float: 'right'
                    }}>Show Recipes</Button>
                </div>
            </div>
        </Modal>
    )
}