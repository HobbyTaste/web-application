import React from 'react';
import {Input} from "./FormsControlsAddHobby/FormsControls";
import {CommonButton} from "../Common/CommonButton";
import style from "./AddHobby.module.css";
import AddHobbyCardContainer from "./AddHobbyCard/AddHobbyCardContainer";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export const AddHobbyForm = (props) => {
    let onOrganizationChange = (e) => {
        let tmp = e.target.value;
        props.setOrganization(tmp);
    };
    let onTelChange = (e) => {
        props.setTelephone(e.target.value);
    };
    let onEmailChange = (e) => {
        props.setEmail(e.target.value);
    };
    let onSiteChange = (e) => {
        props.setSite(e.target.value);
    };
    let onMetroChange = (e) => {
        props.setMetro(e.target.value);
    };
    let onAdressChange = (e) => {
        props.setAdress(e.target.value);
    };
    let onInfoChange = (e) => {
        props.setInfo(e.target.value);
    };
    let uploadImage = (e) => {
       /* e.preventDefault();*/
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            props.setImage(file, reader.result);
        };
        reader.readAsDataURL(file)
    };
    let resetForm = () => {
        props.reset();
    };

    return(
        <div>
            <div className={style.pageContent}>
                <div className={style.formContainer}>
                    <div className={style.hobbyFormContainer}>
                    <h1>Заполните форму о вашем хобби</h1>
                    <form action="#" className={style.form}>
                        <Input name='organization' onChange={onOrganizationChange} value={props.organization}
                               placeholder={"Название организации"} autoFocus={true}/>
                        <Input name='telephone' onChange={onTelChange} value={props.telephone} placeholder={"Телефон *"} type="telephone"/>
                        <Input name='email' onChange={onEmailChange} value={props.email} placeholder={"Email *"} type="email"/>
                        <Input name='site' onChange={onSiteChange} value={props.site} placeholder={"Сайт *"}/>
                        <Input name='metro' onChange={onMetroChange} value={props.metro} placeholder={"Станция метро *"}/>
                        <Input name='adress' onChange={onAdressChange} value={props.adress} placeholder={"Точный адресс *"}/>
                        <Input name='info' onChange={onInfoChange} value={props.info} placeholder={"Краткая информация о хобби *"}/>
                    </form>
                    <label htmlFor="file">
                        <CloudUploadIcon className={style.upload} style={{ fontSize: 80 }} />
                    </label>
                    <input type="file" name="file" id="file" onChange={uploadImage} className={style.input}/>
                    <div>Загрузить фото</div>
                        </div>
                </div>
                <div className={style.formContainer}>
                    <AddHobbyCardContainer />
                    <div className={style.buttonsContainer}>
                        <CommonButton text="ДОБАВИТЬ"/>
                        <div onClick={resetForm}>
                        <CommonButton text="СБРОСИТЬ"/>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
    );
};