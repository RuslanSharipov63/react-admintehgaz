import style from './ModalWindowBurgerMenu.module.css';
import { NavLink, useNavigate } from 'react-router-dom';

const ModalWindowBurgerMenu = () => {

    let navigate = useNavigate();

    const goHome = () => {
        navigate('/')
    }

    return (

        <div className={style.container}>
            <div className={style.item}>
                <button 
                className={style.bt} 
                onClick={goHome}
                style={{
                    color: 'white'
                }}
                >
                    Главная
                </button>
                </div>

                <div className={style.item}>
                <button className={style.bt}>
                    <NavLink
                        to="/AddFormApplications"
                        style={{
                            textDecoration: 'none',
                            color: 'white'
                        }}
                    >
                        Заявки
                    </NavLink>
                </button>
                </div>
            <div className={style.item}>
                <button className={style.bt}>
                    <NavLink
                        to="/DebtList"
                        style={{
                            textDecoration: 'none',
                            color: 'white'
                        }}
                    >
                        Долги
                    </NavLink>
                </button>
            </div>
            <div className={style.item}>
                <button className={style.bt}>
                    <NavLink
                        to="/AddFormPropane"
                        style={{
                            textDecoration: 'none',
                            color: 'white'
                        }}
                    >
                        Пропан
                    </NavLink>
                </button>
            </div>
        </div >

    );
}

export default ModalWindowBurgerMenu;