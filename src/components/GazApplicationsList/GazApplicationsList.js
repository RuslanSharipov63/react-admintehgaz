import { useState, useEffect } from "react";
import { deleteApplication, searchApplication } from "../../store/GazApplicationsSlice";
import { editModalWindow } from "../../store/IsModalWindowSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalWindow from '../modalwindow/modalwindowgazapplication/ModalWindow';
import classes from './GazApplicationsList.module.css';

const GazApplicationsList = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [modalWin, setModalWin] = useState('');


    const gazlist = useSelector(state => state.gazList)

    const delAppl = (item) => {
        dispatch(deleteApplication(item.id))
    }

    const searchAppl = (e) => {
        let a = e.target.value
        setSearch(a)

    }

    const editAppl = (item) => {
        setModalWin(item.id);
        dispatch(editModalWindow(true))

    }

    useEffect(() => {
        dispatch(searchApplication(search))
    }, [search])



    const closeModalWindow = () => {
        setModalWin('')
        dispatch(editModalWindow(false))
    }
    return (

        <>
            {modalWin != '' ? <ModalWindow modalWinId={modalWin} closeModalWindow={closeModalWindow}
            /> : null}
            <div className={classes.someСlass}>
                <h3 className={classes.title}>Заявки</h3>
                <div className={classes.searchContainer}>
                    <label>Поиск </label>
                    <input type="text"
                        value={search}
                        className={classes.search}
                        onChange={searchAppl}
                    />
                </div>
                {gazlist.length === 0 ?
                    <h3>Заявки отсутствуют</h3>
                    : gazlist.map(item =>
                        <div key={item.id}
                            className={classes.application}>
                            <p className={classes.itemAppplTime}>Дата: {item.time}</p>
                            <p className={classes.itemApppl}><span>Компания:</span> {item.company}</p>
                            <div className={classes.itemApppl}>
                                {item.list.map(gaz => <div key={gaz.gazId}>
                                    <p className={classes.itemApppl}>{gaz.name} - {gaz.count}</p>
                                </div>)}
                            </div>
                            <p className={classes.itemApppl}><span>Адрес:</span> {item.adress === 'Адрес доставки' || '' ? null : item.adress}</p>
                            <p className={classes.itemApppl}>
                                <span>ИНН:</span> {item.inn === 'Инн' || '' ? null : item.inn}</p>
                            <div className={classes.itemApppl}><span>Комментарий:</span> {item.comment === 'Комментарий' || '' ? null : item.comment}</div>
                            <div className={classes.btnDelEdit}>
                                <button
                                    className={classes.btn}
                                    onClick={() => delAppl(item)}>
                                    Удалить
                                </button>
                                <button
                                    className={classes.btn}
                                    onClick={() => editAppl(item)}>
                                    Редактировать
                                </button>
                            </div>
                        </div >)}
            </div >
        </>

    );
}

export default GazApplicationsList;