import React from 'react';
import { TextareaAutosize } from '@material-ui/core';
import style from './Feedback.css';
import { Field } from 'redux-form';


const MyTextArea = (props) => {
    const {input, meta} = props;
    const hasError = meta.touched && meta.error;
    return (
        <TextareaAutosize {...input}
                onChange={(value) => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                          className={style.textArea +" "+ (hasError ? style.textAreaError : "")}/>
    )
}

export default MyTextArea;
