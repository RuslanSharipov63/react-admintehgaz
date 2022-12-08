import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from './../../debtList/DebtStyle.module.css';
import { addDebtApplications } from "../../../store/DebtApplicationsSlice";
import { nanoid } from "@reduxjs/toolkit";


const AddFormDebt = () => {
    const debtlist = useSelector(state => state.debtList)
    const dispatch = useDispatch();
    const [debtCompany, setDebtCompany] = useState({
        id: nanoid(),
        time: '',
        company: 'Название компании',
        text: 'Введите текст',
        isDebt: false,
    })
    const [messageError, setMessageError] = useState('')



    const changeHandler = (e) => {
        setDebtCompany({
            ...debtCompany,
            [e.target.name]: e.target.value
        })
    }
    const addDebt = () => {
        let arrErrror = [];
        for (let key in debtCompany) {
            if (
                debtCompany[key] === ' ' || debtCompany[key] === '' || debtCompany[key] === 'Название компании' || debtCompany[key] === 'Введите текст'
            ) {
                arrErrror.push(debtCompany[key])


            }
        }

        if (arrErrror.length > 0) {
            setMessageError('Заполните корректно все поля формы')
        } else {
            dispatch(addDebtApplications(debtCompany))
            setMessageError('')
        }


    }


    const focusDebt = (e) => {
        setDebtCompany({
            ...debtCompany,
            [e.target.name]: ''
        })
    }

    const resetForm = () => {
        setDebtCompany({
            id: nanoid(),
            time: '',
            company: 'Название компании',
            text: 'Введите текст',
            isDebt: false,
        })
    }

    return (

        <div className={classes.someСlassFormDebt} style={{ marginTop: '40px' }}>
            <h4>Добавить должника</h4>
            <p>{messageError != '' ? messageError : null}</p>
            <div>
                <input
                    className={classes.inpAdd}
                    type="date"
                    name="time"
                    value={debtCompany.time}
                    onChange={(e) => changeHandler(e)}
                />
            </div>
            <div>
                <input
                    className={classes.inpAdd}
                    type="text"
                    name="company"
                    value={debtCompany.company}
                    onChange={(e) => changeHandler(e)}
                    onFocus={(e) => focusDebt(e)}
                />
            </div>


            <div>
                <textarea
                    className={classes.inpAdd}
                    name="text"
                    value={debtCompany.text}
                    onChange={(e) => changeHandler(e)}
                    onFocus={(e) => focusDebt(e)}
                >
                </textarea>
            </div>
            <div>
                <button
                    className={classes.inpAdd}
                    onClick={addDebt}
                >
                    Добавить
                </button

                >
            </div>
            <div>
                <button
                    className={classes.inpAdd}
                    onClick={resetForm}>Сброс</button>
            </div>
        </div>

    );
}

export default AddFormDebt;