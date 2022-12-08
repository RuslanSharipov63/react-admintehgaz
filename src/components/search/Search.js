import { useState, useEffect } from 'react';
import classes from './../forms/formapplication/AddFormApplications.module.css';

const Search = (props) => {

    const [month, setMonth] = useState('Выберите месяц');

    useEffect(() => {
        props.changeMonth(month);
    }, [month])

    const handleChange = (e) => {
        setMonth(e.target.value)

    }

    return (
        <div>
            <h2>Фильтр по месяцам</h2>
            <select
                className={classes.inpAdd}
                value={month}
                onChange={(e) => handleChange(e)}
            >
                <option>Выберите месяц</option>
                <option value="01">Январь</option>
                <option value="02">Февраль</option>
                <option value="03">Март</option>
                <option value="04">Апрель</option>
                <option value="05">Май</option>
                <option value="06">Июнь</option>
                <option value="07">Июль</option>
                <option value="08">Август</option>
                <option value="09">Сентябрь</option>
                <option value="10">Октябрь</option>
                <option value="11">Ноябрь</option>
                <option value="12">Декабрь</option>
            </select>
        </div>
    );
}

export default Search;