import styles from './FilterForm.module.scss'
import {Modal} from "../default/Modal/Modal";
import {Checkbox, Divider, FormControlLabel} from "@mui/material";
import colors from '../../scss__abstracts/_variables.scss'
import {useSelector} from "react-redux";

export const FilterForm = (props) => {
    const cuisines = useSelector(state => state.recipes.cuisines)

    return (
        <Modal isOpen={props.isModalOpened} handleClose={() => props.setIsModalOpened(false)}>
            <div className={styles.modal_wrapper}>
                <h3>Filter</h3>
                {cuisines.map((item, idx) =>
                    <div key={idx}>
                        <div className={styles.cuisine_checkbox_wrapper} key={idx}>
                            <FormControlLabel control={
                                <Checkbox sx={{color: colors.shade50, '&.Mui-checked': {color: colors.shade50}}} />
                            } label={item.title} labelPlacement={"start"} />
                        </div>
                        <Divider />
                    </div>
                )}
            </div>
        </Modal>
    )
}