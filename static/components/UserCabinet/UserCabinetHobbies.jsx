import React, { Component, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './UserCabinet.module.css';
import { initializeUserCabinet } from '../../redux/reducers/auth-reducer';
import Slot from '../MainPage/Slot/Slot';

const flags = {
    isParking: true,
    isBeginner: true,
    isRent: true,
};
const image = 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg';

const UserCabinetHobbies = (props) => {
    useEffect(() => {
        props.initializeUserCabinet();
    }, []);

    // if (!props.isAuth) {
    //    return <Redirect to={'/'} />;
    // }

    // add selecting hobbies from props info
    const myHobbies = props.userHobbies.map((c) => <UserHobbyCard {...c} isAuth={props.isAuth}/>);

    return (<div className={style.slotContainer}>
        <div className="center">
            <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                  price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                  isParking={flags.isParking} isBeginner={flags.isBeginner} isRent={flags.isRent}
                  isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth}/>
            <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                  price={null} priceTime={null} priceCurriculum={null}
                  isParking={false} isBeginner={flags.isBeginner} isRent={flags.isRent}
                  isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth}/>
            <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                  price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                  isParking={flags.isParking} isBeginner={false} isRent={flags.isRent}
                  isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth}/>
            <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                  price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                  isParking={flags.isParking} isBeginner={flags.isBeginner} isRent={false}
                  isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth}/>
            <Slot pic={image} name='Вид хобби' metro='Станция метро' adress="Долгопрудный, Первомайская 32 к2"
                  price='400 p.' priceTime='за занятие' priceCurriculum='по будням'
                  isParking={false} isBeginner={false} isRent={flags.isRent}
                  isUserAuth={props.isUserAuth} isProviderAuth={props.isProviderAuth}/>
        </div>
    </div>);
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

// maybe need own initializer
export default connect(mapStateToProps, { initializeUserCabinet })(UserCabinetHobbies);
// export default UserCabinetHobbies;
