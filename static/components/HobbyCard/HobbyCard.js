import React, { Component } from 'react';
import style from './HobbyCard.css';
import feedStyle from './Feedback/Feedback.css';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Feedback from './Feedback/Feedback';
import Sidebar from './Sidebar/Sidebar';
import Slider from './Image/Slider';
import ButtonAction from './ActionButton';
import InformationBlock from './InformationForm/InformationForm';
import { addHobbyForUser, deleteHobbyForUser } from '../../redux/actions/userActions';
import { addHobbyForProvider, deleteHobbyForProvider } from '../../redux/actions/providerActions';
import { isInArray } from '../../utils/functions';
import { initializeHobbyPage } from '../../redux/actions/hobbyActions';
import Preloader from '../Common/Preloader/Preloader';


class HobbyCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddMyHobby = this.handleAddMyHobby.bind(this);
        this.handleDeleteMyHobby = this.handleDeleteMyHobby.bind(this);
    }
    componentDidMount() {
        this.props.initialize(this.props.hobbyInfo.id);
    }

    handleAddMyHobby(event) {
        console.log('addHobby');
        if (this.props.isUserAuth) {
            this.props.onAddUserHobby(this.props.hobbyInfo.id, this.props.id);
        } else {
            this.props.onAddProviderHobby(this.props.hobbyInfo.id, this.props.id);
        }
    }

    handleDeleteMyHobby(event) {
        console.log('delete hobby');
        if (this.props.isUserAuth) {
            this.props.onDeleteUserHobby(this.props.hobbyInfo.id, this.props.id);
        } else {
            this.props.onDeleteProviderHobby(this.props.hobbyInfo.id, this.props.id);
        }
    }

    render() {
        if (!this.props.initializedPage){
            return <Preloader/>
        }
        const isOwner = isInArray(this.props.hobbyInfo.id, this.props.hobbiesOwnedProvider);
        return (
            <div>
                <div className={style.infoContainer}>
                    <div className={style.mainContainer}>
                        <div className={style.mainBlock}>
                            <div className={style.imageContainer}><Slider images ={this.props.hobbyInfo.photos}/></div>
                            <div className={style.textContainer}>
                                <InformationBlock hobbyInfo={this.props.hobbyInfo}/>
                                <div className={style.buttonContainer}>
                                    <ButtonAction isProviderAuth={this.props.isProviderAuth} isUserAuth={this.props.isUserAuth}
                                                  hobbyInfoId={this.props.hobbyInfo.id}
                                                  hobbiesFollowed={this.props.hobbiesFollowed}
                                                  isOwner = {isOwner}
                                                  deleteFromMyHobbies={this.handleDeleteMyHobby}
                                                  addInMyHobbies={this.handleAddMyHobby}/>
                                </div>
                            </div>
                        </div>

                        <h4 className={style.mainDescription}>
                            {this.props.hobbyInfo.description}
                        </h4>
                    </div>
                    <div className={style.panel}>
                        <Sidebar price={this.props.hobbyInfo.price} mobile={this.props.hobbyInfo.contact.mobile}
                                 website={this.props.hobbyInfo.contact.website} flag={this.props.hobbyInfo.flag}/>
                    </div>
                </div>
                <div className={style.communication}>
                    <p className={feedStyle.labelAnswer}> Отзывы:</p>
                    <Feedback isOwner = {isOwner}/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initializedPage: state.hobbyPage.initializedPage,
    id: state.auth.userId || state.providerCabinet.providerId,
    isUserAuth: state.auth.isAuth,
    isProviderAuth: state.providerCabinet.providerIsAuth,
    hobbiesFollowed: [...state.auth.userHobbies, ...state.providerCabinet.followedHobbies],
    hobbiesOwnedProvider: state.providerCabinet.providerHobbies,

    isPageInitialized: state.hobbyPage.initialized,
    hobbyInfo: {
        photos: state.hobbyPage.photos,
        comments: state.hobbyPage.comments,
        id: state.hobbyPage.id,
        label: state.hobbyPage.label,
        metro: state.hobbyPage.metro,
        timeTable: state.hobbyPage.timeTable,
        equipment: state.hobbyPage.equipment,
        address: state.hobbyPage.address,
        comfortable: state.hobbyPage.comfortable,
        specialConditions: state.hobbyPage.specialConditions,
        description: state.hobbyPage.description,
        price: state.hobbyPage.price,
        flag: state.hobbyPage.flag,
        contact: state.hobbyPage.contact,
        category: state.hobbyPage.category,
    },
});
const mapDispatchToProps = (dispatch) => ({
    onAddUserHobby: (idHobby, idUser) => dispatch(addHobbyForUser(idHobby, idUser)),
    onDeleteUserHobby: (idHobby, idUser) => dispatch(deleteHobbyForUser(idHobby, idUser)),
    onAddProviderHobby: (idHobby, idProvider) => dispatch(addHobbyForProvider(idHobby, idProvider)),
    onDeleteProviderHobby: (idHobby, idProvider) => dispatch(deleteHobbyForProvider(idHobby, idProvider)),
    initialize: (idHobby) => dispatch(initializeHobbyPage(idHobby)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HobbyCard);
