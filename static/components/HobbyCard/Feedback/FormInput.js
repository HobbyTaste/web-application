import React from 'react';
import style from './Feedback.css';
import { Field } from 'redux-form';
import MyTextArea from './MyTextArea';
import StarsRating from './StarsRating';
import ButtonSend from '../Button/ButtonsSend';
import ButtonCancel from '../Button/ButtonCancel';
import { required } from '../../../utils/validators/validators';


const FormInput = (props) => {
    return (
        <form className={style.containerAction} onSubmit={props.handleSubmit}>
            <div className={style.text}>
                <Field name="TextFeedback" type = "text" component={MyTextArea} placeholder="Оставьте свой отзыв" validate={[required]}/>
            </div>
            <div className={style.lastLine}>
                {!props.isAnswer ? <div className={style.rating}>
                    Моя оценка:
                    <Field name="StarsRating" component={StarsRating} validate={[required]}/>
                </div> : <div></div>}
                <div className={style.buttonsContainer}><ButtonSend type="submit" /><ButtonCancel type="button" onClick={props.reset}/>
                </div>
            </div>
        </form>
    )
}

export default FormInput;
