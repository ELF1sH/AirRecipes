import styles from './Header.module.scss'
import {TextField} from "../default/TextField/TextField";
import filterIcon from '../../icons/filter.svg'
import {RoundButton} from "../default/RoundButton/RoundButton";
import {useEffect, useRef, useState} from "react";
import {FilterForm} from "../filter-form/FilterForm";

export const Header = () => {
    const textFieldRef = useRef(null)
    const imageRef = useRef(null)

    const defInputTop = useRef(0)
    const defImageHeight = useRef(0)

    useEffect(() => {
        const rectInput = textFieldRef.current.getBoundingClientRect();
        const rectImage = imageRef.current.getBoundingClientRect()
        // need to set up default dimensions for further comparisons
        defInputTop.current = rectInput.top + rectInput.height / 2
        defImageHeight.current = rectImage.height

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('wheel', handleWheel)
    }, [])

    const handleScroll = () => {
        const rectImage = imageRef.current.getBoundingClientRect()
        const rectInput = textFieldRef.current.getBoundingClientRect();

        if (rectImage.bottom > rectInput.top + rectInput.height / 2) {
            window.scrollTo(0, 0);
            imageRef.current.style.height = rectImage.height * 0.97 + "px"
        }
    }

    const handleWheel = async event => {
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        const rectImage = imageRef.current.getBoundingClientRect()
        const rectInput = textFieldRef.current.getBoundingClientRect();
        const inputTop = rectInput.top + rectInput.height / 2
        if (event.deltaY < 0 && rectImage.height < defImageHeight.current && defInputTop.current - inputTop < 2) {
            for (let i = 1; i <= 10; i++) {
                imageRef.current.style.height = rectImage.height * (1 + 0.02 * i) + "px"
                await sleep(1)
            }
        }
    }

    const [isModalOpened, setIsModalOpened] = useState(false)

    return (
        <>
            <div className={styles.header_wrapper}>
                <div className={styles.header_content}>
                    <h1>Air Recipes</h1>
                    <p className={styles.header_desc}>Best Recipes for Best People</p>
                    <div className={styles.filter_container}>
                        <TextField placeholder={"Search"} className={styles.text_field} ref={textFieldRef} />
                        <RoundButton src={filterIcon} onClick={() => setIsModalOpened(true)} />
                    </div>
                </div>
            </div>

            <div className={styles.image_wrapper} ref={imageRef}></div>

            <FilterForm isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />
        </>
    )
}