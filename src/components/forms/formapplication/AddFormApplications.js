/* форма для внесения заявки */

import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import classes from './AddFormApplications.module.css';
import { addApllication } from '../../../store/GazApplicationsSlice';
import { useDispatch, useSelector } from "react-redux";
import GazApplicationsList from '../../GazApplicationsList/GazApplicationsList';


const AddFormApplications = () => {
    const [dateAppl, setDate] = useState('');
    const [company, setCompany] = useState('Название компании')
    const [adress, setAdress] = useState('Адрес доставки')
    const [inn, setInn] = useState('ИНН компании')
    const [comment, setComment] = useState('Комментарий')
    const [values, setValues] = useState('')
    const [countBal, setCountBal] = useState('0')
    const [gazApplications, setGazApplications] = useState([])
    const [messageError, setMessageError] = useState(false)
    const dispatch = useDispatch();
    const gazlist = useSelector(state => state.gazList)

    const handleChange = (event) => {
        setValues(event.target.value);

    };

    const addGazApplication = () => {

        if (values == '' || countBal == '0' || countBal == '') {
            setMessageError(true)
        } else {
            setGazApplications([{ gazId: nanoid(), name: values, count: countBal }, ...gazApplications,])
        }
    }

    const delGazAplications = (item) => {
        setGazApplications([...gazApplications.filter(gaz => gaz.name != item.name)])
    }

    const addApplications = () => {

        if (dateAppl != '' && company != '' && company != 'Название компании') {
            const newGaz = {
                id: nanoid(),
                time: dateAppl,
                company,
                list: gazApplications,
                adress,
                inn,
                comment,
            }

            dispatch(addApllication(newGaz))
            setMessageError(false)
        } else {
            setMessageError(true)
        }


    }

    const resetForm = () => {
        let resetApplArray = [];
        setDate('');
        setCompany('Название компании');
        setAdress('Адрес доставки');
        setInn('ИНН компании');
        setComment('Комментарий');
        setValues('');
        setCountBal('0');
        setGazApplications(resetApplArray);
        setMessageError(false);
    }



    return (
        <div className={classes.allcontainer}>
            <div className={classes.someСlass}>
                <h3 className={classes.title}>Новая заявка</h3>
                {messageError ? <h4>Заполните корректно все поля формы</h4> : null}
                <div>
                    <input
                        className={classes.inpAdd}
                        type="date"
                        value={dateAppl}
                        onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <input
                        className={classes.inpAdd}
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        onFocus={() => setCompany('')}
                    />
                </div>
                <div>
                    <select
                        className={classes.inpAdd}
                        value={values}
                        onChange={handleChange}
                    >
                        <option>Выберете газ</option>
                        <option>Аргон ВС</option>
                        <option>Аргон ВЧ</option>
                        <option>Коргон</option>
                        <option>Кислород</option>
                        <option>Биогон</option>
                        <option>Азот</option>
                        <option>Углекислота</option>
                    </select>
                    <p>Число баллонов</p>
                    <input
                        className={classes.inpCountBal}
                        type="number"
                        value={countBal}
                        onChange={(e) => setCountBal(e.target.value)}
                        onFocus={() => setCountBal('')}

                    />
                    <div>
                        <button
                            className={classes.inpAdd}
                            onClick={addGazApplication}>
                            Добавить газ
                        </button>
                    </div>

                    {gazApplications.length > 0 ? gazApplications.map(item => <div key={item.gazId} className={classes.stateGazApl}>
                        <p>
                            {item.name} - {item.count}
                            <button
                                className={classes.butDelGazApl}
                                onClick={() => delGazAplications(item)}>
                                удалить
                            </button>
                        </p>
                    </div>) : null}

                </div>
                <div>
                    <input
                        className={classes.inpAdd}
                        type="text"
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                        onFocus={() => setAdress('')}
                    />
                </div>
                <div>
                    <input
                        className={classes.inpAdd}
                        type="text"
                        value={inn}
                        onChange={(e) => setInn(e.target.value)}
                        onFocus={() => setInn('')} />
                </div>
                <div>
                    <textarea
                        className={classes.inpAdd}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onFocus={() => setComment('')}
                    >
                    </textarea>
                </div>
                <div>
                    <button
                        className={classes.inpAdd}
                        onClick={addApplications} >Добавить заявку</button>
                </div>
                <div>
                    <button
                        className={classes.inpAdd}
                        onClick={resetForm}>Сброс</button>
                </div>

            </div>
            <GazApplicationsList />
        </div>
    );
}

export default AddFormApplications;


