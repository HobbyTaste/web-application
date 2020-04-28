import React, { useState } from 'react';
import style from './UserInfo.module.css';
import { AnimatedModalWindow } from '../../../../HOC/AnimatedModalWindow/AnimatedModalWindow';
import ChangeForm from './ChangeUserInfoForm/ChangeUserInfoForm';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';

const UserInfo = (props) => {
    // const Edit = AnimatedModalWindow(ChangeForm, 'Редактировать');
    const [editing, setEditing] = useState(false);

    function handleClick(e) {
        setEditing(!editing);
    }

    return (
        <div className={style.infoContainer}>
            { editing
                ? <div>
                    <ChangeForm name={props.name} metro={props.metro}/>
                    <button onClick={handleClick} placeholder='Техническая кнопка'/>
                </div>
                : <div>
                    <div className={style.name}>{props.name}</div>
                    <div className={style.metro}>
                        <LocationOnIcon style={{ color: '#178FD6' }} /> {props.metro}
                    </div>
                    <button className={style.buttonChange} onClick={handleClick}>
                        Редактировать<EditIcon className={style.iconEdit}/>
                    </button>
                </div>
            }
        </div>
    );
};

export default UserInfo;
