import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import classes from './DebtStyle.module.css';
import AddFormDebt from "../forms/formdebt/AddFormDebt";
import { handleIsDebtActions, searchAction, deleteDebtAction } from "../../store/DebtApplicationsSlice";
import { editModalWindow } from './../../store/IsModalWindowSlice';
import ModalWindowDebt from "../modalwindow/modalwindowdebt/ModalWindowDebt";

const DebtList = () => {
    const dispatch = useDispatch();
    const debtlist = useSelector(state => state.debtList);
    const [modalWin, setModalWin] = useState(false);
    const [debtItem, setDebtItem] = useState({})


    const handleChange = (item) => {
        dispatch(handleIsDebtActions(item.id));
    }

    const searchAppl = (e) => {
        dispatch(searchAction(e.target.value))
    }


    const delDebt = (item) => {
        dispatch(deleteDebtAction(item.id))
        alert('Запист успешно удалена');
    }

    const editDebt = (item) => {
        setModalWin(true)
        setDebtItem(item)
        dispatch(editModalWindow(true))
    }

    const closeMWP = () => {
        setModalWin(false)
        dispatch(editModalWindow(false))
    }

    return (
        <div
            className={classes.bigContainer}
        >
            <div
                className={classes.littleContainer}
            >
                <AddFormDebt />
                {modalWin ? <ModalWindowDebt closeMWP={closeMWP} debtItem={debtItem} /> : null}
                <div className={classes.someСlass}>
                    <h3 className={classes.title}>Должники</h3>
                    <div className={classes.searchContainer}>
                        <label>Поиск </label>
                        <input type="text"
                            className={classes.search}
                            onChange={searchAppl}
                        />
                    </div>

                    {debtlist.length == 0 ? 'Должники отсутствуют' :
                        debtlist.map(item =>
                            <div key={item.id} className={classes.application}
                                style={{ opacity: item.isDebt ? '0.3' : '1' }}
                            >
                                <div>
                                    <p style={{ display: 'inline' }}>{item.isDebt ? 'Долг закрыт' : 'Долг открыт'}</p>
                                    <input
                                        className={classes.inpAdd}
                                        style={{ margin: '15px' }}
                                        type="checkbox"
                                        name="isCheck"
                                        checked={item.isDebt}
                                        onChange={() => handleChange(item)}

                                    />
                                </div>
                                <p className={classes.itemAppplTime}>
                                    Дата: {item.time}
                                </p>
                                <p className={classes.itemApppl}><span>Компания:</span> {item.company}</p>
                                <p className={classes.itemApppl}><span>Описание:</span> {item.text}</p>
                                <div className={classes.btnDelEdit}>
                                    <button
                                        className={classes.btn}
                                        onClick={() => delDebt(item)}>
                                        Удалить
                                    </button>
                                    <button
                                        className={classes.btn}
                                        onClick={() => editDebt(item)}>
                                        Редактировать
                                    </button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>


    );
}

export default DebtList;