import React, {Component} from 'react';
import s from './Info.module.css';


const Info = (props) => {
    return ( <div>
            <h3 className={s.h3}>Обратная связь</h3>
            <div className={s.text}>Если у вас есть какие-то замечания или пожелания, пожалуйста</div>
            <div className={s.text}>сообщите нам об этом.</div>
        </div>
    );
};

export default Info;