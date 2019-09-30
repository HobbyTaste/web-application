import React from 'react'
import UserInfo from "./services_components/user_info";
import Grid from "@material-ui/core/es/Grid";
import ServicesField from "./services_components/services_field";
import ControlPanel from "./additional_components/control_panel";
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import * as PropTypes from "prop-types";

class ServicesBlock extends React.Component {
    render() {
        return (
            <div className={"services-block"}>
                <ServicesField data={this.props.data}/>
                <ControlPanel {...this.props}/>
            </div>
        )
    }
}

ServicesBlock.propTypes = {
    onBackButtonClick: PropTypes.func,
    userInfo: PropTypes.object,
    data: PropTypes.array.isRequired
};

export default ServicesBlock;