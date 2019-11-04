import React, {Component} from 'react';
import s from './Feedback.module.css';
import Info from './Info';
import Button from './Button';


const Feedback = (props) => {
    return (<div className={s.feedback}>
            <Info/>
            <Button/>
        </div>
    );
};

export default Feedback;