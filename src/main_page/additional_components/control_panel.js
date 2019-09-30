import React from 'react'
import {ArrowBack, ArrowForward} from "@material-ui/icons";
import Button from "@material-ui/core/es/Button/Button";

class ControlPanel extends React.Component {
    render() {
        return (
            <div className={"control-buttons"}>
                <Button variant={"contained"} color={"primary"} className={"back-button"} onClick={this.props.onBackButtonClick}>
                    <ArrowBack/>
                    Back
                </Button>
                <Button variant={"contained"} color={"primary"} className={"next-button"} onClick={this.props.onNextButtonClick}>
                    Next
                    <ArrowForward/>
                </Button>
            </div>
        )
    }
}

export default ControlPanel;