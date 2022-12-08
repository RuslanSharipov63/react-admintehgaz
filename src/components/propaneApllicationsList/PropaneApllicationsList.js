import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { editModalWindow } from './../../store/IsModalWindowSlice';
import classes from './../GazApplicationsList/GazApplicationsList.module.css';
import { deletePropane, searchPropan } from '../../store/PropaneApplicationsSlice';
import ModalWindPropane from '../modalwindow/ModalWindPropane';
import Search from '../search/Search';




const PropaneApplicationsList = () => {
    const dispatch = useDispatch();
    const propanelist = useSelector(state => state.propaneList)
    const [modalWindPropane, setModalWindPropane] = useState(false);
    const [propaneId, setPropaneId] = useState('');
    const [monthState, setMonthState] = useState('Выберите месяц');




    const delPropane = (item) => {
        dispatch(deletePropane(item.id))
    }

    const editPropane = (item) => {
        setPropaneId(item.id)
        setModalWindPropane(true)
        dispatch(editModalWindow(true))

    }
    const closeMWP = () => {
        setModalWindPropane(false)
        dispatch(editModalWindow(false))
    }

    const changeMonth = (month) => {
        setMonthState(month);
    }

    useEffect(() => {
        if (monthState !== 'Выберите месяц') {
            let searchArray = {
                month: monthState,
                count: 4,
            }
            dispatch(searchPropan(searchArray))

        }
    }, [monthState])
    return (
        <>
            {modalWindPropane ? <ModalWindPropane propaneId={propaneId} closeMWP={closeMWP} /> : null}
            <div className={classes.someСlass}>
                <h3 className={classes.title}>
                    Заправки - пропан
                </h3>
                <Search changeMonth={changeMonth} />
                {propanelist.length == 0 ?
                    <p className={classes.itemApppl}>Данные отсутствуют</p> :
                    propanelist.map(item =>
                        <div
                            key={item.id}
                            className={classes.application}
                        >
                            <p className={classes.itemAppplTime}>
                                <span>Дата</span>: {item.time}
                            </p>
                            <p className={classes.itemApppl}>
                                <span>Номер машины</span>:  {item.carNumber}
                            </p>
                            <p className={classes.itemApppl}>
                                <span>Число баллонов</span>:  {item.amountGasCylinder}
                            </p>
                            <p className={classes.itemApppl}>
                                <span>Количество литров</span>:  {item.liters}
                            </p>
                            <p className={classes.itemApppl}>
                                <span>ФИО водителя</span>:  {item.nameDriver}
                            </p>
                            <div className={classes.btnDelEdit}>
                                <button
                                    className={classes.btn}
                                    onClick={() => delPropane(item)}
                                >
                                    Удалить
                                </button>
                                <button
                                    className={classes.btn}
                                    onClick={() => editPropane(item)}
                                >
                                    Редактировать
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default PropaneApplicationsList;