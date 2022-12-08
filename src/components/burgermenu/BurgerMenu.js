import { useState } from 'react';
import { useEffect } from 'react';

import style from './BurgerMenu.module.css';

const BurgerMenu = (props) => {

    const [classN, setClassN] = useState(false);
    useEffect(() => {
        props.propsFunc(classN);
    }, [classN])


    return (
        <div className={style.container}>
            <div
                className={style.containerMenu}
                onClick={() => setClassN(!classN)}
            >
                <div className={classN ? style.itemClickThree : style.item}></div>
                <div className={classN ? style.itemClick : style.item}></div>
                <div className={classN ? style.itemClickTwo : style.item}></div>
            </div>
            <div className={style.title}><h1>ТехГаз</h1></div>
        </div>
    );
}

export default BurgerMenu;