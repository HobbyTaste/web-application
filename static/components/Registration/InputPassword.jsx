import React from 'react';
import style from './RegistrationNew.css';
import Input from '@material-ui/core/Input';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0',
        paddingTop: '4px',
    },
}));

export const InputPassword = ({ input, label, ...custom }) => {
    const classes = useStyles();
    const [isVisible, setVisible] = React.useState(false);
    const handleClick = () => {
        setVisible(!isVisible);
    };
    return (
        <div>
        {
            isVisible ?
                <div className={style.formContainerPassword} >
                    <Input className={style.formInputPassword } name={'password'} type={'text'} placeholder={'Пароль'}
                           disableUnderline={true} autoFocus={true} label={custom.fieldName}
                           {...input}
                           {...custom}/>
                        <Button className={classes.root} onClick={handleClick}><p className={style.icon}><VisibilityOffIcon/></p></Button>
                </div>
:
    <div className={style.formContainerPassword} >
        <Input className={style.formInputPassword } name={'password'} type={'password'} placeholder={'Пароль'}
               disableUnderline={true} autoFocus={true} label={custom.fieldName}
            {...input}
            {...custom}/>
            <Button className={classes.root} onClick={handleClick}><p className={style.icon}><VisibilityIcon/></p></Button>
    </div>

}</div>)

};

export const InputSign = ({ input, label, ...custom }) => {
    return (
        <Input
            id="outlined-input"
            label={custom.fieldName}
            type={custom.type}
            className={style.formInput}
            variant="outlined"
            {...input}
            {...custom}
        />
    );
};