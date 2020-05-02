import React, { Component, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { initializeProviderCabinet } from '../../../redux/actions/providerActions';
import style from './ProviderMonetization.module.css';

const defaultImage = 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg';

const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
        margin: '5px',
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
    },
    checkedIcon: {
        backgroundColor: '#178FD6',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#178FD6',
        },
    },
});

function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={`${classes.icon} ${classes.checkedIcon}`} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

const ProviderMonetization = (props) => {
    useEffect(() => {
        props.initializeProviderCabinet();
    }, []);

    const [state, setState] = useState({
        showHelp: false,
        Hobby: null,
        Widget: null,
        Top: null,
        Poster: null,
        Pay: null,
    });

    // if (!props.isAuth) {
    //    return <Redirect to={'/'} />;
    // }

    const handleChange = (event) => {
        setState({
            [event.target.name]: event.target.value,
        });
    };

    const Help = (value) => {
        setState({
            showHelp: value,
        });
    };

    return (<div className={style.background}>
        <div className={style.header}>
            Выберите хобби:
        </div>
        <div className={style.header}>
            Выберите тип монетизации:
        </div>
        <div className={style.monetizationContainer}>
            <span className={style.monetization}>
                <div className={style.hobbyContainer}>
                    <span className={style.name}>Топ поиска</span>
                    <span className={style.helpIcon} /*onMouseOver={Help(true)} onMouseOut={Help(false)}*/>
                        <HelpOutlineOutlinedIcon/>
                    </span>
                    {/*<div className={style.explanation} style={{ display: `${state.showHelp ? 'block' : 'none'}` }}>*/}
                    {/*    Ваше объявление имеет преимущество в ранжировании и находится*/}
                    {/*    на первых местах при поиске в категории хобби.*/}
                    {/*</div>*/}
                </div>
                <div className={style.centringContainer}>
                    <div className={style.img}
                        style={{ backgroundImage: `url("${defaultImage}")` }}/>
                </div>
                <FormControl component="fieldset">
                    <div className={style.time}>Продолжительность:</div>
                    <RadioGroup aria-label="time" name="Top" onChange={handleChange}>
                        <FormControlLabel value='short' control={<StyledRadio/>} label="7 дней" />
                        <FormControlLabel value='middle' control={<StyledRadio/>} label="14 дней" />
                        <FormControlLabel value='long' control={<StyledRadio/>} label="30 дней" />
                    </RadioGroup>
                </FormControl>
            </span>
            <span className={style.monetization}>
                <div className={style.hobbyContainer}>
                    <span className={style.name}>Виджет</span>
                    <span className={style.helpIcon} /*onMouseOver={Help(true)} onMouseOut={Help(false)}*/>
                        <HelpOutlineOutlinedIcon/>
                    </span>
                    {/*<div className={style.explanation} style={{ display: `${state.showHelp ? 'block' : 'none'}` }}>*/}
                    {/*    Ваше объявление размещается в виджете на главной странице.*/}
                    {/*</div>*/}
                </div>
                <div className={style.centringContainer}>
                    <div className={style.img}
                        style={{ backgroundImage: `url("${defaultImage}")` }}/>
                </div>
                <FormControl component="fieldset">
                    <div className={style.time}>Продолжительность:</div>
                    <RadioGroup aria-label="time" name="Widget" onChange={handleChange}>
                        <FormControlLabel value='short' control={<StyledRadio/>} label="7 дней" />
                        <FormControlLabel value='middle' control={<StyledRadio/>} label="14 дней" />
                        <FormControlLabel value='long' control={<StyledRadio/>} label="30 дней" />
                    </RadioGroup>
                </FormControl>
            </span>
            <span className={style.monetization}>
                <div className={style.hobbyContainer}>
                    <span className={style.name}>Афиша</span>
                    <span className={style.helpIcon} /*onMouseOver={Help(true)} onMouseOut={Help(false)}*/>
                        <HelpOutlineOutlinedIcon/>
                    </span>
                    {/*<div className={style.explanation} style={{ display: `${state.showHelp ? 'block' : 'none'}` }}>*/}
                    {/*Ваше объявление размещается на афише слева от основной части*/}
                    {/*сайта, не смещается при перемотке страницы и всегда видна.*/}
                    {/*</div>*/}
                </div>
                <div className={style.centringContainer}>
                    <div className={style.img}
                        style={{ backgroundImage: `url("${defaultImage}")` }}/>
                </div>
                <FormControl component="fieldset">
                    <div className={style.time}>Продолжительность:</div>
                    <RadioGroup aria-label="time" name="Poster" onChange={handleChange}>
                        <FormControlLabel value='short' control={<StyledRadio/>} label="7 дней" />
                        <FormControlLabel value='middle' control={<StyledRadio/>} label="14 дней" />
                        <FormControlLabel value='long' control={<StyledRadio/>} label="30 дней" />
                    </RadioGroup>
                </FormControl>
            </span>
        </div>
        <div className={style.explanation}>Вы можете выбрать один или несколько способов монетизации</div>
        <div className={style.paymentContainer}>
            <span className={style.header}>Оплатить:</span>
            <FormControl component="fieldset">
                <RadioGroup aria-label="time" name="Poster" onChange={handleChange}>
                    <FormControlLabel value='card' control={<StyledRadio/>} label="Карта Visa/MasterCard" />
                    <FormControlLabel value='online' control={<StyledRadio/>} label="Сбербанк Онлайн" />
                    <FormControlLabel value='debt' control={<StyledRadio/>} label="В долг :)" />
                </RadioGroup>
            </FormControl>
        </div>
        <button className={style.payButton}>Оплатить</button>
    </div>);
};

const mapStateToProps = (state) => ({
    // providerIsAuth: state.providerCabinet.providerIsAuth,
    providerIsAuth: true,
    // name: state.providerCabinet.name,
    email: state.providerCabinet.email,
    phone: state.providerCabinet.phone,
    info: state.providerCabinet.info,
    // avatar: state.providerCabinet.avatar,
    password: state.providerCabinet.password,
    providerInitialized: state.providerCabinet.providerInitialized,
    providerHobbies: state.providerCabinet.providerHobbies,

    name: 'Контора "Рога и копыта"',
    avatar: 'https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-800x600.jpg',
});

// maybe need own initializer
export default connect(mapStateToProps, { initializeProviderCabinet })(ProviderMonetization);
// export default UserCabinetHobbies;