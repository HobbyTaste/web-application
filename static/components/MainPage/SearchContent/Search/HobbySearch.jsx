import React from 'react';
import Select from 'react-select';
import s from './Search.module.css';

/*const customControlStyles = base => ({
    ...base,
    height: 50,
    color: state.isSelected ? 'gray' : 'yellow'
});*/

const HobbySearch = (props) => {
    return (<div className={s.searchContainer}>
        <div className={s.title}>Введите хобби</div>
        <Select className={s.hobbySelect}
                placeholder={"Поиск"}
                value={props.selectedHobby}
                onChange={props.hobbyChange}
                options={props.hobbies}
                /*styles={{control: customControlStyles}}*/
        />
    </div>);
};
export default HobbySearch;
