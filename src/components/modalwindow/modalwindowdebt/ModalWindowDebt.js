import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classes from './ModalWindowDebt.module.css';
import { editDebtAction } from '../../../store/DebtApplicationsSlice';

const ModalWindowDebt = (props) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const { id, company, isDebt, text, time } = props.debtItem;
    const [editDebt, setEditDebt] = useState({
        id,
        company,
        isDebt,
        text,
        time
    })


    const [topWind, setTopWind] = useState(1);
    let counter = 0;

    const handleScroll = (e) => {
       
        if (e.deltaY === -100 || e.deltaY === -125 || e.deltaY === -108) {
            counter = counter - 3;

            setTopWind(counter)
        } else {
            counter = counter + 3;

            setTopWind(counter)
        }

    }

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return function () {
            window.removeEventListener('wheel', handleScroll);
        }
    }, [])
    const inpFocus = (e) => {
        setMessage('');
        setEditDebt({
            ...editDebt,
            [e.target.name]: ''
        })
    }

    const inpHandler = (e) => {
        setMessage('');
        setEditDebt({
            ...editDebt,
            [e.target.name]: e.target.value
        })
    }

    const sendEditDebt = () => {
        let arrErrror = [];
        for (let key in editDebt) {
            if (
                editDebt[key] === ' ' || editDebt[key] === ''
            ) {
                arrErrror.push(editDebt[key])
            }
        }

        if (arrErrror.length > 0) {
            setMessage('Заполните корректно все поля формы')
        } else {
            dispatch(editDebtAction(editDebt))
            setMessage('Карточка успешно отредактрована');
        }

    }

    return (
        <div className={classes.bigContainer}
            style={{ top: `${topWind}vh`, }}
        >
            <p style={{ fontSize: '1.5em', textAlign: 'left' }}>{message != '' ? message : null}</p>
            <div className={classes.inp}>
                <p className={classes.pModalWindow}>Дата</p>
                <input
                    type="date"
                    name="time"
                    className={classes.inpAdd}
                    value={editDebt.time}
                    onChange={(e) => inpHandler(e)}
                />
            </div>
            <div className={classes.inp}>
                <p className={classes.pModalWindow}>Компания</p>
                <input
                    type="text"
                    name="company"
                    className={classes.inpAdd}
                    value={editDebt.company}
                    onChange={(e) => inpHandler(e)}
                    onFocus={(e) => inpFocus(e)}
                />
            </div>
            <div className={classes.inp}>
                <p className={classes.pModalWindow}>Комментарий</p>
                <textarea
                    name="text"
                    className={classes.inpAdd}
                    value={editDebt.text}
                    onChange={(e) => inpHandler(e)}
                ></textarea>
            </div>
            <div className={classes.butDelGazApl}>
                <button
                    className={classes.btn}
                    onClick={sendEditDebt}
                >
                    Отправить
                </button>
                <button
                    className={classes.btn}
                    onClick={props.closeMWP}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
}

export default ModalWindowDebt;