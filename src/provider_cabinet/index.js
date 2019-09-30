import ReactDOM from "react-dom";
import React from "react";
import ProviderCabinet from "../provider_cabinet/provider_cabinet";


class Page extends React.Component {
    render() {
        return (
            <ProviderCabinet/>
        )
    }
}

ReactDOM.render(<Page/>, document.getElementById('root'));

module.hot.accept();