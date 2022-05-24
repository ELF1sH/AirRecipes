import styles from './Modal.module.scss'
import {Button, IconButton, Modal as MuiModal} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import useRipple from "use-ripple-hook";
import colors from "../../../scss__abstracts/_variables.scss";

export const Modal = (props) => {
    return (
        <MuiModal
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={styles.modal_wrapper}>
                {props.children}
                <IconButton className={styles.close_btn} component="span" onClick={props.handleClose} >
                    <CloseIcon />
                </IconButton>
            </div>
        </MuiModal>
    )
}