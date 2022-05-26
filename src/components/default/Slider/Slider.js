import styles from './Slider.module.scss'
import {useEffect, useImperativeHandle, useState} from "react";
import {Slider as MuiSlider} from "@mui/material";
import colors from '../../../scss__abstracts/_variables.scss'
import React from 'react'

export const Slider = React.forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value)

    useEffect(() => {
        if (props.value && Array.isArray(props.value))
        setValue(props.value)
    }, [props.value])

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            setValue(newValue)
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - props.minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + props.minDistance)]);
        }

        props.onChange()
    };

    useImperativeHandle(
        ref,
        () => ({
            getState: () => {return value}
        }),
        [value]
    )

    return (
        <MuiSlider
            getAriaLabel={() => 'Minimum distance'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="on"
            disableSwap
            size="small"
            sx={{
                color: colors.shade50
            }}
            min={props.min ?? 0}
            max={props.max ?? 100}
            className={props.className}
        />
    )
})