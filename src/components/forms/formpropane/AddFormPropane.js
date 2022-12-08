import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addPropaneApplication } from "../../../store/PropaneApplicationsSlice";
import classes from './../formapplication/AddFormApplications.module.css';
import PropaneApplicationsList from '../../propaneApllicationsList/PropaneApllicationsList'




const arrIsFetch = [
    '', 'Номеры машины', '0', 'Имя водителя'
]

const AddFormPropane = () => {

    const [datePropane, setDatePropane] = useState('');
    const [carNumber, setCarNumber] = useState('Номер машины');
    const [amountGasCylinder, setAmountGasCylinder] = useState('0');
    const [liters, setLiters] = useState('0');
    const [nameDriver, setNameDriver] = useState('Имя водителя');
    const [messageError, setMessageError] = useState(false)

    const dispatch = useDispatch();

    const addPropaneAppl = () => {

        const newPropane = {
            id: nanoid(),
            time: datePropane,
            carNumber,
            amountGasCylinder,
            liters,
            nameDriver,
        }


        const keyNewPropane = Object.values(newPropane);
        const arrMessage = [];

        for (let key in keyNewPropane) {
            for (let item in arrIsFetch) {
                if (keyNewPropane[key] == arrIsFetch[item]) {
                    arrMessage.push(keyNewPropane[key])
                    console.log(arrMessage)
                    setMessageError(true)
                }
            }
        }

        if (arrMessage.length == 0) {
            dispatch(addPropaneApplication(newPropane))
            setDatePropane('')
            setCarNumber('Номер машины')
            setAmountGasCylinder('0')
            setLiters('0')
            setNameDriver('Имя водителя')
            setMessageError(false)

        }
    }

    const resetForm = () => {
        setDatePropane('')
        setCarNumber('Номер машины')
        setAmountGasCylinder('0')
        setLiters('0')
        setNameDriver('Имя водителя')
        setMessageError(false);
    }

    return (
        <div className={classes.allcontainer}>
            <div className={classes.someСlass}>
                <h3 className={classes.title}>Новая заправка</h3>
                {messageError ? <h4>Заполните корректно все поля формы</h4> : null}
                <div>
                    <input
                        className={classes.inpAdd}
                        type="date"
                        value={datePropane}
                        onChange={(e) => setDatePropane(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className={classes.inpAdd}
                        type="text"
                        value={carNumber}
                        onChange={(e) => setCarNumber(e.target.value)}
                        onFocus={() => setCarNumber('')}
                    />
                </div>
                <div>
                    <p>Число баллонов</p>
                    <input
                        className={classes.inpAdd}
                        type="number"
                        value={amountGasCylinder}
                        onChange={(e) => setAmountGasCylinder(e.target.value)}
                        onFocus={() => setAmountGasCylinder('')}
                    />
                </div>
                <div>
                <p>Количество литров</p>
                    <input
                        className={classes.inpAdd}
                        type="number"
                        value={liters}
                        onChange={(e) => setLiters(e.target.value)}
                        onFocus={() => setLiters('')}
                    />
                </div>
                <div>
                    <input
                        className={classes.inpAdd}
                        type="text"
                        value={nameDriver}
                        onChange={(e) => setNameDriver(e.target.value)}
                        onFocus={() => setNameDriver('')}
                    />
                </div>
                <div>
                    <button
                        onClick={addPropaneAppl}
                        className={classes.inpAdd}
                    >
                        Добавить заправку
                    </button>
                    <div>
                        <button
                            className={classes.inpAdd}
                            onClick={resetForm}>Сброс</button></div>

                </div>

            </div>
            <PropaneApplicationsList />
        </div>
    );
}



export default AddFormPropane;