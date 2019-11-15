import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {MySelect} from "../../../Common/FormsControls/FormsControls";
import {CommonButton} from "../../../Common/CommonButton";
import style from "./HobbySelect.module.css";
import {Link} from 'react-router-dom';

let SelectForm = ({handleSubmit, hobbies, metroStations}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <Field name="hobby" component={MySelect} options={hobbies} label={"Введите хобби"}/>
                </div>
                <div>
                    <Field name="metro" component={MySelect} options={metroStations} label={"Введите станцию метро"}/>
                </div>
            </div>
            <div>
                <CommonButton className={style.button} text={"Подобрать хобби"} label="Submit" onSubmit={handleSubmit}>
                    <Link to='/hobbies'><span>Подобрать хобби</span></Link></CommonButton>
                <Link to='/hobbies'><button>Button</button></Link>
            </div>
        </form>
    )
};

const SelectingFormValuesForm = reduxForm({
    form: 'mainSelect'
})(SelectForm);

const Seleect = (props) => {
    const onSubmit = (values, dispatch) => {
        console.log(values);
    };

    const hobbies = [
        {
            label: 'Футбол',
            value: 'Футбол',
        },
        {
            label: 'Шашки',
            value: 'Шашки',
        },
        {
            label: 'Кёрлинг',
            value: 'Кёрлинг',
        },
    ];

    const metroStations = [
        {
            label: 'Марьина роща',
            value: 'Марьина роща',
        },
        {
            label: 'Алтуфьево',
            value: 'Алтуфьево',
        },
        {
            label: 'Чистые пруды',
            value: 'Чистые пруды',
        },
    ];

    return(
        <div>
            <SelectingFormValuesForm onSubmit={onSubmit} hobbies={hobbies} metroStations={metroStations}/>
        </div>
    );
};

const selector = formValueSelector('mainSelect');
export default connect(
    state => {
        const hobbyValue = selector(state, 'hobby');
        const metroValue = selector(state, 'metro');
        return {
            hobbyValue, metroValue
        }
    }
)(Seleect);
