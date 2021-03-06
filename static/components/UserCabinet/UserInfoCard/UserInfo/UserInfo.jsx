import React, { useState } from 'react';
import style from './UserInfo.module.css';
import ChangeForm from './ChangeUserInfoForm/ChangeUserInfoForm';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';

const UserInfo = (props) => {
    const [editing, setEditing] = useState(false);

    function handleClick(e) {
        setEditing(!editing);
    }

    return (<div className={style.infoContainer}>
        <div className={style.name}>{props.name}</div>
        {/* Когда-нибудь на бэкенд добавится метро, и можно будет вернуть эту красоту */}
        {/* <div className={style.metro}>
            <LocationOnIcon style={{ color: '#178FD6' }} /> {props.metro}
        </div> */}
        <div className={style.metro}>
            {props.email}
        </div>
        { editing
            ? <div className={style.editContainer}>
                <ChangeForm name={props.name} email={props.email} handleClick={handleClick}/>
            </div>
            : <div>
                <button className={style.editButton} onClick={handleClick}>
                    Редактировать<EditIcon className={style.iconEdit}/>
                </button>
            </div>
        }
    </div>);
};

export default UserInfo;
