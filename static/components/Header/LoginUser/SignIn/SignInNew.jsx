import React from 'react';
import style from '../../../Registration/RegistrationNew.css';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Input } from '@material-ui/core';
import ButtonReg from '../../../Registration/ButtonRegistration';
import { login } from '../../../../redux/actions/userActions';
import { InputPassword } from '../../../Registration/InputPassword';
import { loginProvider } from '../../../../redux/actions/providerActions';

const FormHeader = (props) => {
    let text = 'Вход партнера';
    if (props.isProvider) {
        text = 'Вход пользователя';
    }
    return (
        <div className={style.formHeader}>
            <button className={style.enterButton} onClick={props.onChangeSign}>
                {text}
            </button>
            <button className={style.enterButton} onClick={props.onCLickRegistation}>
                Регистрация
            </button>
        </div>
    );
};

const FormMain =({handleSubmit, isProvider,  error})=> {

    console.log(handleSubmit);
    let text = "Вход пользователя"

    if (isProvider){
        text = "Вход партнера";
    }
    return (
        <div className={style.formMain}>
            <h3 className={style.formH3 + ' ' + style.formH3Sign}>{text}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <Field component={Input} className={style.formInput} name={'login'} placeholder={'Логин'}
                           disableUnderline={true} autoFocus={true}/>
                </div>
                <div>
                    <Field component={InputPassword}/>
                </div>
                <div>
                    <ButtonReg label="Submit" onSubmit={handleSubmit} text={'Вход'}/>
                </div>
            </form>
        </div>
    );
};


const LoginReduxForm = reduxForm({ form: 'login' })(FormMain);


const LoginNew = (props) => {

    const onSubmit = (formData) => {
        console.log("Submit");
        if (props.isProvider) {
            props.loginProvider(formData.email, formData.password);
        } else {
            props.login(formData.email, formData.password);
        }
    };

    return (
        <div className={style.formContainerSign}>
            <header>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            </header>
            <FormHeader isProvider={props.isProvider} onCLickRegistation = {props.onCLickRegistation} onChangeSign ={props.onChangeSign}/>
            <LoginReduxForm handleSubmit={onSubmit} isProvider={props.isProvider}/>
        </div>
    );
};

export default connect(null, {
    login,
    loginProvider
})(LoginNew);
