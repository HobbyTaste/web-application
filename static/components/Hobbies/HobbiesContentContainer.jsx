import React, {Component} from 'react';
import {connect} from "react-redux";
import {setHobbyCards, setCurrentPage, setTotalHobbiesCount, toggleIsFetching} from "../../redux/reducers/hobbiesPage-reducer";
import HobbiesContent from "./HobbiesContent";

class HobbiesContentContainer extends React.Component {

    render() {
        return <div>
            <HobbiesContent hobbyCards={this.props.hobbyCards} pageSize={this.props.pageSize}/>
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        hobbyCards: state.hobbiesPage.hobbyCards,
        pageSize: state.hobbiesPage.pageSize,
        totalHobbiesCount: state.hobbiesPage.totalHobbiesCount,
        currentPage: state.hobbiesPage.currentPage,
        isFetching: state.hobbiesPage.isFetching
    }
};

let mapDispatchToProps = (dispatch) => {
  return {
      setHobbyCards: (hobbyCards) => {
          dispatch(setHobbyCards(hobbyCards));
      },
      setCurrentPage: (currentPage) => {
          dispatch(setCurrentPage(currentPage));
      },
      setTotalHobbiesCount: (totalCount) => {
          dispatch(setTotalHobbiesCount(totalCount));
      },
      toggleIsFetching: (isFetching) => {
          dispatch(toggleIsFetching(isFetching));
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HobbiesContentContainer)