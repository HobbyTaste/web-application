import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import SearchField from "./search_components/search_field";
import SelectField from "./search_components/select_field";
import TimeField from "./search_components/time_field";
import ControlPanel from "./additional_components/control_panel";
import * as PropTypes from "prop-types";

class SearchArea extends React.Component {
    constructor(props) {
        super(props);
        let days_week = this.props.field_values["days_week"] || [];
        this.state = {
            select_field_show: !!this.props.field_values["metro_station"],
            time_field_show: !!(this.props.field_values["time_from"]
                || this.props.field_values["time_to"] || days_week.length)
        };
        this.ShowSelectField = this.ShowSelectField.bind(this);
        this.ShowTimeField = this.ShowTimeField.bind(this);
        this.onNextButtonClick = this.onNextButtonClick.bind(this);
        this.onBackButtonClick = this.onBackButtonClick.bind(this);
        this.HideSelectField = this.HideSelectField.bind(this);
        this.ShowTimeField = this.ShowTimeField.bind(this);
    }


    onNextButtonClick()
     {
        if(!this.state.select_field_show) {
            this.ShowSelectField();
            return;
        }
        if(!this.state.time_field_show) {
            this.ShowTimeField();
            return;
        }
        if(this.state.time_field_show && this.state.select_field_show) {
            this.props.endSearchFunction();
        }
    }

    onBackButtonClick() {
        if(this.state.time_field_show) {
            this.HideTimeField();
            return;
        }
        if(this.state.select_field_show) {
            this.HideSelectField();
        }
    }

    ShowSelectField() {
        this.setState({select_field_show: true});
    }

    ShowTimeField() {
        this.setState({time_field_show: true});
    }

    HideSelectField() {
        this.setState({select_field_show: false});
    }

    HideTimeField() {
        this.setState({time_field_show: false});
    }

    render() {
        let {time_from, time_to, days_week} = this.props.field_values;
        days_week = days_week || [];

        return (
            <div className={"search-area"}>
                <ReactCSSTransitionGroup
                    transitionName={"base-animation"}
                    transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    <SearchField key={"search-field"}
                                 onButtonClick={this.ShowSelectField}
                                 update_external_value={this.props.update_field_values}
                                 value={this.props.field_values["hobby_name"]}/>
                    {this.state.select_field_show
                        ? <SelectField update_external_value={this.props.update_field_values}
                                       key={"select-field"}
                                       onButtonClick={this.ShowTimeField}
                                       value={this.props.field_values["metro_station"]}
                        />
                        : null}
                    {this.state.time_field_show
                        ? <TimeField key={"time-field"}
                                     endSearchFunction={this.props.endSearchFunction}
                                     update_external_value={this.props.update_field_values}
                                     value={{time_from: time_from, time_to: time_to, days_week: new Set(days_week)}}
                        />
                        : null}
                </ReactCSSTransitionGroup>
                <ControlPanel onNextButtonClick={this.onNextButtonClick} onBackButtonClick={this.onBackButtonClick}/>
            </div>
        )
    }
}

SearchArea.propTypes = {
    update_field_values: PropTypes.func.isRequired,
    field_values: PropTypes.object.isRequired
};

export default SearchArea;