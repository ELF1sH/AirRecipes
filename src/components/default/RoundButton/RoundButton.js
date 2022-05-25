import styles from './RoundButton.module.scss'
import useRipple from "use-ripple-hook";
import colors from '../../../scss__abstracts/_variables.scss'

export const RoundButton = (props) => {
    const [ripple, event] = useRipple({
        color: colors.shade20
    })

    return (
        <button ref={ripple} onMouseDown={event} onClick={props.onClick} className={styles.btn}>
            <img src={props.src} alt="" draggable={false} />
        </button>
    )
}