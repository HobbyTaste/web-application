import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import './index.css';
import 'antd/dist/antd.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import SearchArea from "./search_area";
import ServicesBlock from "./services";
import FormReg from "./entrance_block/reg_user";
import {AccountCircle} from "@material-ui/icons";
import Grid from "@material-ui/core/es/Grid";
import FormSignIn from "./entrance_block/sign_in";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import Button from "@material-ui/core/es/Button/Button";
import FeedbackForm from "./entrance_block/feedback_form";
import ProviderRegDialog from "./provider_reg/provider_reg";

function getArray(object, n) {
    return [...new Array(n)].map(item => Object.assign({}, object));
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            in_search_state: true,
            in_providers_section: false,
            in_reg_section: false,
            in_signIn_section: false,
            in_progress_state: false,
            in_feedback_section: false,
            logged_in: false,
            in_reg_provider_section: false,
        };
        this.CloseSearchState = this.CloseSearchState.bind(this);
        this.OpenProvidersSection = this.OpenProvidersSection.bind(this);
        this.CloseProvidersSection = this.CloseProvidersSection.bind(this);
        this.OpenSearchState = this.OpenSearchState.bind(this);
        this.OpenRegDialog = this.OpenRegDialog.bind(this);
        this.CloseRegDialog = this.CloseRegDialog.bind(this);
        this.ReturnToSearchState = this.ReturnToSearchState.bind(this);
        this.onLogoClick = this.onLogoClick.bind(this);
        this.update_field_values =  this.update_field_values.bind(this);
        this.CloseSignInDialog = this.CloseSignInDialog.bind(this);
        this.OpenSignInSection = this.OpenSignInSection.bind(this);
        this.SignOut = this.SignOut.bind(this);
        this.onUserEnter = this.onUserEnter.bind(this);
        this.onFeedbackButtonClick = this.onFeedbackButtonClick.bind(this);
        this.CloseFeedbackFrom = this.CloseFeedbackFrom.bind(this);
        this.CloseProviderRegSection = this.CloseProviderRegSection.bind(this);
        this.onProvidersRegButtonClick = this.onProvidersRegButtonClick.bind(this);

        this.user_info = {};
        this.field_values = {};
        this.hobbies = [];
        this.metro_stations = [];
        this.hobbies = getArray(this.hobbies[0], 10);
        this.GetMetroStations();
    }

    GetMetroStations() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/metro_stations");
        xhr.send();
        xhr.onload = () => {
            this.metro_stations = JSON.parse(xhr.response);
        }
    }

    update_field_values(name_field, value) {
        this.field_values[name_field] = value;
    }


    CloseSearchState() {
        this.setState({in_search_state: false, in_progress_state: true}, () => {
            let request = new XMLHttpRequest();
            request.open("POST", "/get_hobbies");
            for(let key in this.field_values) {
                if (this.field_values[key] == "") delete this.field_values[key];
            }
            request.send(JSON.stringify(this.field_values));
            request.onload = () => {
                this.hobbies = JSON.parse(request.response);
                this.setState({in_progress_state: false});
                this.OpenProvidersSection();
            };
        });
    }

    OpenSearchState() {
        this.setState({in_search_state: true}, () => {
            document.querySelector("body").style.animation ="toSearchState 1s forwards";
        });
    }

    OpenProvidersSection() {
        this.setState({in_providers_section: true}, () => {
            document.querySelector("body").style.animation ="toProvidersSection 1s forwards";
        });
    }

    CloseProvidersSection() {
        this.setState({in_providers_section: false});
    }

    OpenRegDialog() {
        this.setState({in_reg_section: true});
    }

    CloseRegDialog() {
        this.setState({in_reg_section: false});
    }

    ReturnToSearchState() {
        this.CloseProvidersSection();
        this.OpenSearchState();
    }

    onLogoClick() {
        this.ReturnToSearchState();
    }

    CloseSignInDialog() {
        this.setState({in_signIn_section: false});
    }

    OpenSignInSection() {
        this.setState({in_signIn_section: true});
    }

    SignOut() {
        this.setState({logged_in: false})
    }

    onUserEnter(user_info) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/get_user_info");
        xhr.send();
        xhr.onload = () => {
            this.user_info = JSON.parse(xhr.responseText);
        };
        this.setState({logged_in: true});
    }

    onFeedbackButtonClick() {
        this.setState({in_feedback_section: true});
    }

    CloseFeedbackFrom() {
        this.setState({in_feedback_section: false});
    }

    onProvidersRegButtonClick() {
        this.setState({in_reg_provider_section: true});
    }

    CloseProviderRegSection() {
        this.setState({in_reg_provider_section: false});
    }

    render() {
        console.log('RENDER');
        return (
            <div className="main">
                {
                    this.state.in_progress_state &&
                    <div className={"progress-window"}>
                        <CircularProgress className={"circle-progress"}/>
                    </div>
                }
                <header className="page-header">
                    <Grid container>
                        <Grid item xs={6} sm={4} className={"logo"} onClick={this.onLogoClick}><h1>Hobby Taste</h1></Grid>
                        <Grid item xs={6} sm={8} className={"user"}>
                            {this.state.logged_in ?
                                <div>
                                    <div className={"user-name"}><span className={"name"}>{this.user_info.name}</span></div>
                                    <Button variant={"contained"} href={"/user_cabinet"}>Личный кабинет</Button>
                                    <button className={"exit-button"} onClick={this.SignOut}>ВЫЙТИ</button>
                                </div>
                                :
                                <div>
                                    <button className={"reg-button"} onClick={this.OpenRegDialog}>РЕГИСТРАЦИЯ</button>
                                    <button className={"entry-button"} onClick={this.OpenSignInSection}>ВОЙТИ</button>
                                    <Link to='/user'>В личный кабинет</Link>
                                    <Link to='/provider'>В кабинет партнера</Link>
                                    <Link to='/newHobby'>Новое хобби</Link>
                                    <FormReg open={this.state.in_reg_section} CloseRegDialog={this.CloseRegDialog}/>
                                    <FormSignIn CloseSignInDialog={this.CloseSignInDialog} open={this.state.in_signIn_section} SignIn={this.onUserEnter}/>
                                </div>
                            }
                        </Grid>
                    </Grid>
                 </header>
                <div className="content">
                    <div className={"container"}>
                        <ReactCSSTransitionGroup transitionName={"base-animation"} transitionEnterTimeout={300} transitionLeaveTimeout={500}>
                            {this.state.in_providers_section ? <ServicesBlock key={"1"} onBackButtonClick={this.ReturnToSearchState} data={this.hobbies} userInfo={this.state.logged_in ? this.user_info : null}/> : null}
                            {this.state.in_search_state ? <SearchArea update_field_values={this.update_field_values} key={"2"} endSearchFunction={this.CloseSearchState} field_values={this.field_values}/> : null}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
                <footer>
                    <div className={"container"}>
                        <Grid container>
                            <Grid item xs={12} sm={6} className={"contacts-container"}>
                                <div>
                                    <h3>Контактные данные</h3>
                                    <ul>
                                        <li><span>Телефон:</span> +79153939881</li>
                                        <li><span>Почта:</span> hobbyTaste@mail.ru</li>
                                    </ul>
                                </div>
                                    <Button variant={"contained"} color={"primary"} className={"partner-reg"} onClick={this.onProvidersRegButtonClick}>Зарегестрироваться как партнер</Button>
                                    <ProviderRegDialog open={this.state.in_reg_provider_section} metro_stations={this.metro_stations} onClose={this.CloseProviderRegSection}/>
                            </Grid>
                            <Grid item xs={12} sm={6} className={"feedback-container"}>
                                <div>
                                    <h3>Обратная связь</h3>
                                    <p className={"notices"}>Если у вас есть какие-то замечания или пожелания, пожалуйста сообщите нам об этом.</p>
                                </div>
                                <Button variant={"contained"} color={"secondary"} className={"feedback"} onClick={this.onFeedbackButtonClick}>Оставить отзыв</Button>
                                <FeedbackForm open={this.state.in_feedback_section} onClose={this.CloseFeedbackFrom}/>
                            </Grid>
                        </Grid>
                    </div>
                </footer>
            </div>
        )
    }
}

export default HomePage;
