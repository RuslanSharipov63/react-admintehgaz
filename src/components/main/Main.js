import { NavLink, useNavigate } from 'react-router-dom';
import classes from './Main.module.css';

const Main = () => {

    let navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    return (
        <div className={classes.container}>
            <div className={classes.smallcontainer}>
                <h1>ТехГаз</h1>
                <div
                    className={classes.btncontainer}>
                    <button className={classes.btn}>
                        <NavLink
                            to="/AddFormApplications"
                            style={{ textDecoration: 'none' }}>
                            Заявки
                        </NavLink>
                    </button>
                    <button className={classes.btn}>
                        <NavLink
                            to="/DebtList"
                            style={{ textDecoration: 'none' }}>
                            Долги
                        </NavLink>
                    </button>
                    <button className={classes.btn}>
                        <NavLink
                            to="/AddFormPropane"
                            style={{ textDecoration: 'none' }}>
                            Пропан
                        </NavLink>
                    </button>
                    <button className={classes.btn}
                        onClick={goHome}
                        style={{
                            color: 'blue',
                            color: '-webkit-link',
                            cursor: 'pointer'
                        }}
                    >
                        {/*  */}
                        Главная
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Main; 