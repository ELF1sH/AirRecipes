import styles from './TextField.module.scss'
import searchIcon from '../../../icons/search.svg'
import clearInputIcon from '../../../icons/clear_input.svg'
import {useState} from "react";
import React from "react";

export const TextField = React.forwardRef((props, ref) => {

    const [value, setValue] = useState("")
    const onChange = (event) => {
        setValue(event.target.value)
        if (props.onChange) props.onChange(event.target.value)
    }
    const clear = (event) => {
        setValue("")
        if (props.onChange) props.onChange(event.target.value)
    }

    return (
        <div className={`${styles.input_wrapper} ${props.className}`}>
            <img src={searchIcon} className={styles.search_icon} alt="" draggable={false} />
            <input
                className={styles.input} type="text" ref={ref} value={value}
                placeholder={props.placeholder} onChange={onChange} />
            {
                value.length > 0 ?
                    <img src={clearInputIcon} className={styles.clear_icon} alt="" draggable={false} onClick={clear} />
                    : ""
            }
        </div>
    )
})