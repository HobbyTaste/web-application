import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {MySelect} from "../../../Common/FormsControls/FormsControls";
import style from "./HobbySelect.module.css";
import {compose} from 'redux';
import {RedLongButton} from "../../../Common/MaterialsButtons";
import {Redirect} from "react-router-dom";
import {setSubmit} from "../../../../redux/reducers/mainPage-reducer";

let SelectForm = ({handleSubmit, hobbies, metroStations}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <Field name="hobby" component={MySelect} options={hobbies} placeholder={"Введите хобби"}/>
                </div>
                <div>
                    <Field name="metro" component={MySelect} options={metroStations} placeholder={"Введите станцию метро"}/>
                </div>
            </div>
                <div className={style.SearchHobbyButton}>
                    <RedLongButton className={style.button} text={"Подобрать хобби"} label="Submit" onSubmit={handleSubmit} />
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
        props.setSubmit();
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
    const metroStations = props.metroStationsToSelect;
    {if(props.isSubmit) {
        return <Redirect to='/hobbies' />;
    }
    else {
        return(
            <div>
                <SelectingFormValuesForm onSubmit={onSubmit} hobbies={hobbies} metroStations={metroStations}/>
            </div>
        );
    }
    }
};

const selector = formValueSelector('mainSelect');

const mapStateToProps = (state) => {
    return {metroStationsToSelect: state.mainPage.metroStationsToSelect,
            isSubmit: state.mainPage.isSubmit}
};

export default compose(
    connect(mapStateToProps, {setSubmit}),
    connect(
        state => {
            const hobbyValue = selector(state, 'hobby');
            const metroValue = selector(state, 'metro');
            return {
                metroStationsToSelect: state.mainPage.metroStationsToSelect,
                hobbyValue, metroValue
            }
        }
    )
)(Seleect);