import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import LaunchIcon from '@material-ui/icons/Launch';
import EmailIcon from '@material-ui/icons/Email';
import React from 'react';
import CommentText from '../../HobbyCard/Feedback/CommentText';
import Slot from '../../MainPage/Slot/Slot';
import style from './Content.css';

const Content = (props) => {

    const isUserAuth = props.isUserAuth;
    const isProviderAuth = props.isProviderAuth;
    return (
        <ul className={style.list}>
            {
                props.hobbies.map(function (item) {
                    return <li key={item.id} className={style.container}>
                        <Slot pic={item.pic} name={item.label} metro={item.metro} adress={item.adress} price={item.price}
                              isUserAuth={isUserAuth} isProviderAuth={isProviderAuth} isBeginner={item.flag.isBeginner}
                              isRent={item.flag.isRent} isChild={item.flag.isChild} priceTime={item.priceTime}
                              priceCurriculate={item.priceCurriculate}/>
                    </li>;
                })
            }
        </ul>
    );
};


export default Content;
