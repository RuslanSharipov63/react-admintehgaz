import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editApllication } from "../../../store/GazApplicationsSlice";
import classes from './ModalWindow.module.css';
import SelectGaz from "../../selectGaz/SelectGaz";




const ModalWindow = (props) => {
    const dispatch = useDispatch();

    const propaneItem = useSelector(state => state.gazList)
    const propaneId = propaneItem.filter(gaz => gaz.id === props.modalWinId)
    const { id, time, company, list = [], adress, inn, comment } = propaneId[0];


    const [dateAppl, setDate] = useState(time);
    const [companyId, setCompany] = useState(company)
    const [valuesId, setValuesId] = useState(list)
    const [adressId, setAdress] = useState(adress)
    const [innId, setInnId] = useState(inn)
    const [commentId, setCommentId] = useState(comment)
    const [newGazNameAppl, setNewGazNameAppl] = useState([])
    const [topWind, setTopWind] = useState(1);

    let counter = 0;

    const handleScroll = (e) => {
        
        if (e.deltaY === -100 || e.deltaY === -125 || e.deltaY === -108) {
            counter = counter - 4;
            console.log(counter)
            setTopWind(counter)
        } else {
            counter = counter + 4;
            console.log(counter)
            setTopWind(counter)
        }

    }

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return function () {
            window.removeEventListener('wheel', handleScroll);
        }
    }, [])

    const propGazNameAppl = (newGazNameApplProp) => {
        setNewGazNameAppl(newGazNameApplProp)
    }

    const editGazApplications = () => {

        let newArr = [];
        let newValuesId = [...valuesId];

        valuesId.map(item => {
            newGazNameAppl.map(user => {
                if (item.name === user.name) {
                    newArr.push(item.name)
                }
            })
        })

        for (let i = 0; i < newArr.length; i++) {
            let index = newValuesId.findIndex(item => item.name === newArr[i])
            newValuesId.splice(index, 1);
        }

        const newGazList = {
            id: id,
            time: dateAppl,
            company: companyId,
            list: [...newValuesId, ...newGazNameAppl],
            adress: adressId,
            inn: innId,
            comment: commentId

        }
        console.log(newGazList)
        dispatch(editApllication(newGazList))
        alert('Запись отредактирована')
    }




    const delValuesId = (gaz) => {
        setValuesId([...valuesId.filter(item => item.gazId !== gaz.gazId)])
    }

    return (

        <div className={classes.bigContainer}
            style={{ top: `${topWind}vh` }}
        >
            <div className={classes.wrapper}>
                <div className={classes.inp}>
                    <input
                        className={classes.inpAdd}
                        type="date"
                        value={dateAppl}
                        onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className={classes.inp}>
                    <input
                        className={classes.inpAdd}
                        type="text"
                        value={companyId}
                        onChange={(e) => setCompany(e.target.value)}
                        onFocus={() => setCompany('')}
                    />
                </div>
                <div>
                    {valuesId.length === 0 ? null : valuesId.map((gaz, key) => <div>
                        <div key={gaz.gazId}>
                            <p className={classes.pModalWindow}>
                                {gaz.name} -  {gaz.count}
                                <span
                                    className={classes.pModalWindow}
                                    onClick={() => delValuesId(gaz)}
                                    style={{
                                        textDecoration: 'none',
                                        fontSize: '140%',
                                        paddingLeft: '2%',
                                        cursor: 'pointer',
                                    }}
                                >
                                    &#215;
                                </span>

                            </p>
                        </div>
                    </div>)}
                    <SelectGaz propGazNameAppl={propGazNameAppl} />
                    <div>
                        <p className={classes.pModalWindow}>Адрес</p><input
                            className={classes.inpAdd}
                            type="text"
                            value={adressId}
                            onChange={(e) => setAdress(e.target.value)}
                            onFocus={() => setAdress('')}
                        />
                    </div>
                    <div>
                        <p className={classes.pModalWindow}>ИНН</p>
                        <input
                            className={classes.inpAdd}
                            type="text"
                            value={innId}
                            onChange={(e) => setInnId(e.target.value)}
                            onFocus={() => setInnId('')}
                        />
                    </div>
                    <div>
                        <p className={classes.pModalWindow}>Комментарий</p>
                        <textarea
                            className={classes.inpAdd}
                            value={commentId}
                            onChange={(e) => setCommentId(e.target.value)}
                            onFocus={() => setCommentId('')}
                        ></textarea>
                    </div>
                </div>
                <div className={classes.containerForBt}>
                <button
                    className={classes.butDelGazApl}
                    onClick={props.closeModalWindow}
                >
                    Закрыть
                </button>
                <button
                    className={classes.butDelGazApl}
                    onClick={editGazApplications}
                >
                    Отправить
                </button>
                </div>
            </div>
        </div>

    )
}

export default ModalWindow;