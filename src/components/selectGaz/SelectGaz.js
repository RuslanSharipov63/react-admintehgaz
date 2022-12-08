import { nanoid } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';
import classes from './SelectGaz.module.css';



const SelectGaz = (props) => {
    const [gazName, setGazName] = useState('');
    const [countGazName, setCountGazName] = useState(0);
    const [gazNameAppl, setGazNameAppl] = useState([])

    const handleGazName = (e) => {
        setGazName(e.target.value)
    }

    useEffect(() => {

    }, [setGazNameAppl])

    const addGazName = () => {

        let newArr =
        {
            gazId: nanoid(),
            name: gazName,
            count: countGazName,
        }

        setGazNameAppl([...gazNameAppl, newArr])


    }

    props.propGazNameAppl(gazNameAppl);

    const delGazName = (item) => {
        setGazNameAppl([...gazNameAppl.filter(gaz => gaz.gazId !== item.gazId)])
    }

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.selectContainer}>
                <select
                    className={classes.inpSelect}
                    value={gazName}
                    onChange={handleGazName}
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

                <div className={classes.inp}>
                <input
                    className={classes.inpCountBal}
                    type="number"
                    value={countGazName}
                    onChange={(e) => setCountGazName(e.target.value)}
                    onFocus={() => setCountGazName('')}

                />
                </div>
                </div>


                <div>
                    <button
                        className={classes.inpAdd}
                        onClick={addGazName}
                    >
                        Добавить газ
                    </button>
                </div>
              

                {
                    gazNameAppl.length > 0 ? gazNameAppl.map(item => <div key={item.gazId} className={classes.stateGazApl}>
                        <p className={classes.item}>
                            {item.name} - {item.count}
                            <button
                                className={classes.butDelGazApl}
                                onClick={() => delGazName(item)}>
                                удалить
                            </button>
                        </p>
                    </div>) : null
                }
            </div>
        </div>
    );
}

export default SelectGaz; 