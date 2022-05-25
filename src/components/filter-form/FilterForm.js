import styles from './FilterForm.module.scss'
import {Modal} from "../default/Modal/Modal";
import {Button, Checkbox, Divider, FormControlLabel} from "@mui/material";
import colors from '../../scss__abstracts/_variables.scss'
import {useSelector} from "react-redux";
import {Slider} from "../default/Slider/Slider";

export const FilterForm = (props) => {
    const recipes = useSelector(state => state.recipes)

    const applyFilters = () => {
        
    }

    return (
        <Modal isOpen={props.isModalOpened} handleClose={() => props.setIsModalOpened(false)}>
            <div className={styles.modal_wrapper}>
                <h3>Filter</h3>
                {recipes.cuisines.map(item =>
                    <div key={item.id}>
                        <div className={styles.cuisine_checkbox_wrapper}>
                            <FormControlLabel control={
                                <Checkbox
                                    defaultChecked={recipes.filterState.cuisineFilter.find(x => x.id === item.id).status}
                                    sx={{color: colors.shade50, '&.Mui-checked': {color: colors.shade50}}}
                                />
                            } label={item.title} labelPlacement={"start"} />
                        </div>
                        <Divider />
                    </div>
                )}

                <Slider
                    minDistance={50}
                    value={[recipes.filterState.calFilterMin, recipes.filterState.calFilterMax]}
                    min={100} max={1200} className={styles.slider}
                />
                <p className={styles.p}>Calories, kCal</p>

                <div className={styles.button_row}>
                    <Button variant="outlined" onClick={() => props.setIsModalOpened(false)} sx={{
                        borderColor: colors.shade50,
                        color: colors.shade50,
                        '&:hover': { borderColor: colors.shade50 }
                    }}>Clear</Button>
                    <Button variant="contained" onClick={applyFilters} sx={{
                        bgcolor: colors.shade50,
                        '&:hover': { bgcolor: '#746B5F' }
                    }}>Show Recipes</Button>
                </div>
            </div>
        </Modal>
    )
}