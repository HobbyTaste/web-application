import React from 'react';
import style from './UploadPhoto.module.css';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';

const UploadPhoto = (props) => {
    return (
        <div className={style.uploadBlock}>
            <div>
                <label htmlFor="file">
                    <CloudUploadIcon className={style.upload} style={{fontSize: 80}}/>
                </label>
                <input type="file" name="file" id="file" onChange={props.uploadImage} className={style.input}/>
                <div>Загрузить фото</div>
            </div>
            <div className={style.image}>
                {props.url ? <div>
                    <img className={style.avatar} src={`${props.url}`} alt="картинка"/>
                    <CloseIcon className={style.closeIcon} onClick={props.deleteUrl}/>
                </div> : ''}
            </div>
        </div>
    );
};

export default UploadPhoto