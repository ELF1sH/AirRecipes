import styles from './BulletedList.module.scss'

export const BulletedList = (props) => {
    return (
        <div className={props.className}>
            <h3 className={styles.header}>{props.header}</h3>
            {
                !props.countBullet ?
                    <ul>
                        {
                        props.items.map((item, idx) =>
                            <li key={idx}>
                                <p>{item}</p>
                            </li>
                        )}
                    </ul>
                :
                    <ol>
                        {
                        props.items.map((item, idx) =>
                            <li key={idx}>
                                <p>{item}</p>
                            </li>
                        )}
                    </ol>
            }
        </div>
    )
}