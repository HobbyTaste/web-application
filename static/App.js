import React from 'react';
import {Route} from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Hobbies from './components/Hobbies/Hobbies'
import Login from "./components/Login/Login";
import UserCabinet from "./components/UserCabinet/UserCabinet";
import Registration from "./components/Registration/Registration";
import HeaderContainer from "./components/Header/HeaderContainer";
import SimpleModal from "./components/ModalWindow/ModalWindow";

function App(props) {
  return (<div>
        <div className="app-wrapper">
          <HeaderContainer />
          <div className="app-wra   pper-content">
              <Route exact path="/" render={ () => <MainPage />}/>
              <Route exact path="/hobbies" render={ () => <Hobbies />} />
              {/*<Route exact path="/login" render={ () => <Login />} />*/}
              <Route exact path="/registration" render={ () => <Registration />} />
              <Route exact path="/user_cabinet" render={ () => <UserCabinet />} />
          </div>
        </div>
      </div>
  );
}



export default App;
