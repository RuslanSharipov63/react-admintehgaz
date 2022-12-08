import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import classes from './../forms/formapplication/AddFormApplications.module.css';
import { editPropaneApplication } from '../../store/PropaneApplicationsSlice';

const ModalWindPropane = (props) => {
    const dispatch = useDispatch();
    const id = props.propaneId;
    const propaneItem = useSelector(state => state.propaneList.filter(item => item.id === id))

    const [editForm, setEditForm] = useState({
        id: propaneItem[0].id,
        time: propaneItem[0].time,
        carNumber: propaneItem[0].carNumber,
        amountGasCylinder: propaneItem[0].amountGasCylinder,
        liters: propaneItem[0].liters,
        nameDriver: propaneItem[0].nameDriver,
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

    const inpHandler = (event) => {
        setEditForm({
            ...editForm, [event.target.name]: event.target.value,
        })
    }

    const inpFocus = (event) => {
        setEditForm({
            ...editForm, [event.target.name]: '',
        })
    }

    const sendPropaneApplication = () => {
        dispatch(editPropaneApplication(editForm))
        alert('Карточка отредактирована')
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'fixed',
            padding: '1%',
            maxHeight: '700px',
            top: `${topWind}vh`,
            maxWidth: '80%',    
            marginLeft: '10%',
            marginRight: '10%',
            backgroundColor: '#5F9EA0',
            borderRadius: '10px',

        }}>
            <div>
                <p className={classes.pModalWindow}>Дата</p>
                <input
                    type="date"
                    name="time"
                    className={classes.inpAdd}
                    value={editForm.time}
                    onChange={(e) => inpHandler(e)}

                />
            </div>
            <div>
                <p className={classes.pModalWindow}>Номер машины</p>
                <input
                    type="text"
                    name="carNumber"
                    className={classes.inpAdd}
                    value={editForm.carNumber}
                    onChange={(e) => inpHandler(e)}
                    onFocus={(e) => inpFocus(e)}
                />
            </div>
            <div>
                <p className={classes.pModalWindow}>Баллоны</p>
                <input
                    type="text"
                    name="amountGasCylinder"
                    className={classes.inpAdd}
                    value={editForm.amountGasCylinder}
                    onChange={(e) => inpHandler(e)}
                    onFocus={(e) => inpFocus(e)}
                />
            </div>
            <div>
                <p className={classes.pModalWindow}>Литры</p>
                <input
                    type="text"
                    name="liters"
                    className={classes.inpAdd}
                    value={editForm.liters}
                    onChange={(e) => inpHandler(e)}
                    onFocus={(e) => inpFocus(e)}
                />
            </div>
            <div>
                <p className={classes.pModalWindow}>Водитель</p>
                <input
                    type="text"
                    name="nameDriver"
                    className={classes.inpAdd}
                    value={editForm.nameDriver}
                    onChange={(e) => inpHandler(e)}
                    onFocus={(e) => inpFocus(e)}
                />
            </div>
            <div>
                <button
                    className={classes.butDelGazApl}
                    onClick={sendPropaneApplication}
                >
                    Отправить
                </button>
                <button
                    className={classes.butDelGazApl}
                    onClick={props.closeMWP}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
}

export default ModalWindPropane;