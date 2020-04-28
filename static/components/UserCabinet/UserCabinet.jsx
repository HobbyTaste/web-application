import React, { Component, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './UserCabinet.module.css';
import UserInfoCard from './UserInfoCard/UserInfoCard';
import { initializeUserCabinet } from '../../redux/reducers/auth-reducer';
import UserHobbyCard from './UserHobbyCard/UserHobbyCard';
import Feedback from '../HobbyCard/Feedback/Feedback';
import UserCabinetHobbies from './UserCabinetHobbies';

const UserCabinet = (props) => {
    useEffect(() => {
        props.initializeUserCabinet();
    }, []);

    const [mainPage, setMainPage] = useState(true);

    // if (!props.isAuth) {
    //    return <Redirect to={'/'} />;
    // }

    function chaneScreen(e) {
        setMainPage(!mainPage);
    }

    return (mainPage
        ? <div className={style.background}>
            <div className={style.infoContainer}>
                <UserInfoCard avatar={props.avatar} name={props.name} metro={props.metro}/>
            </div>
            <div className={style.feedbackHeader}>Ваши отзывы и ответы на них:</div>
            <div className={style.feedbackContainer}>
                <Feedback isUserAuth={false} isProviderAuth={props.isProviderAuth} />
            </div>
            <button onClick={chaneScreen} placeholder='Техническая кнопка'/>
        </div>
        : <div className={style.background}>
            <div className={style.hobbyHeader}>Ваши хобби:</div>
            <UserCabinetHobbies/>
            <button onClick={chaneScreen} placeholder='Техническая кнопка'/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    // name: state.auth.name,
    name: 'Иван Иванов',
    // metro: state.auth.metro,
    metro: 'Долгопрудная',
    // avatar: state.auth.avatar,
    avatar: 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg',
    userHobbies: state.auth.userHobbies,
    // isAuth: state.auth.isAuth,
    isUserAuth: true,
    isProviderAuth: false,
});

export default connect(mapStateToProps, { initializeUserCabinet })(UserCabinet);
