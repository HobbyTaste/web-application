import React from 'react';
import Select from 'react-select';
import s from "./Search.module.css";

const MetroSearch = (props) => {
    return( <div className={s.searchContainer}>
            <div className={s.title}>Введите место занятий</div>
        <Select
        placeholder={"Поиск"}
        value={props.selectedMetro}
        onChange={props.metroChange}
        options={props.stations}
        /> </div>);
};
export default MetroSearch;
