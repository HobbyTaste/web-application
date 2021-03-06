import React, { Component, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './UserCabinet.module.css';
import UserInfoCard from './UserInfoCard/UserInfoCard';
import { initializeUserCabinet } from '../../redux/actions/userActions';
import CommentsList from '../HobbyCard/Feedback/CommentsList';
import { defaultAvatarUrl } from "../../utils/constant";


const UserCabinet = (props) => {
    useEffect(() => {
        props.initializeUserCabinet();
    }, []);

    if (!props.isAuth) {
        return <Redirect to={"/"} />;
    }

    return (
        <div className={style.background}>
            <div className={style.infoContainer}>
                <UserInfoCard avatar={props.avatar || defaultAvatarUrl} name={props.name} email={props.email} />
            </div>
            <div className={style.feedbackHeader}>Ваши отзывы и ответы на них:</div>
            <div className={style.feedbackContainer}>
                <CommentsList isProvider={false} isOwner={false} comments={props.userComments || []}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    name: state.userCabinet.name,
    //metro: state.userCabinet.metro,
    email: state.userCabinet.email,
    avatar: state.userCabinet.avatar,
    userHobbies: state.userCabinet.userHobbies,
    userComments: state.userCabinet.userComments,
    isAuth: state.userCabinet.isAuth,
    isProviderAuth: false,
});

export default connect(mapStateToProps, { initializeUserCabinet })(UserCabinet);
