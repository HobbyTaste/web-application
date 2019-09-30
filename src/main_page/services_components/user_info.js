import React from 'react'
import {AccountCircle} from "@material-ui/icons";
import * as PropTypes from "prop-types";

class UserInfo extends React.Component {
    render() {
        let {userInfo} = this.props;

        return (
            <div className={"user-info services-container"}>
                {/*<h1>User Info</h1>*/}
                <div className={"user-login"}>
                    <AccountCircle className={"user-icon"}/>
                    <h2>{userInfo.name} {userInfo.third_name}</h2>
                </div>
            </div>
        )
    }

}

UserInfo.propTypes = {
    userInfo: PropTypes.object,
};

export default UserInfo;