import styles from './ProgressCircle.module.scss'
import {CircularProgress} from "@mui/material";

export const ProgressCircle = () => {
    return (
        <CircularProgress className={styles.progress} size="3rem" />
    )
}